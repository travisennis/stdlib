import { Option } from "./option.ts";

export class Try<T> {
	private constructor(private value: T | Error) {}

	static success<T>(value: T): Try<T> {
		return new Try(value);
	}

	static failure<T>(error: Error): Try<T> {
		return new Try<T>(error);
	}

	unsafeGet(): T {
		if (this.isFailure()) {
			throw new Error("Cannot get value from a failed Try");
		}
		return this.value as T;
	}

	isSuccess(): boolean {
		return !(this.value instanceof Error);
	}

	isFailure(): boolean {
		return this.value instanceof Error;
	}

	getOrElse(defaultValue: T): T {
		return this.isSuccess() ? (this.value as T) : defaultValue;
	}

	getOrThrow(): T {
		if (this.isFailure()) {
			throw this.value;
		}
		return this.value as T;
	}

	failSilently(callback: (e: Error) => void) {
		if (this.isFailure()) {
			callback(this.value as Error);
			return Option.none<T>();
		}
		return Option.some<T>(this.value as T);
	}

	map<U>(f: (value: T) => U): Try<U> {
		if (this.isFailure()) {
			return Try.failure(this.value as Error);
		}
		try {
			return Try.success(f(this.value as T));
		} catch (e) {
			return Try.failure(e instanceof Error ? e : new Error(String(e)));
		}
	}

	flatMap<U>(f: (value: T) => Try<U>): Try<U> {
		if (this.isFailure()) {
			return Try.failure(this.value as Error);
		}
		try {
			return f(this.value as T);
		} catch (e) {
			return Try.failure(e instanceof Error ? e : new Error(String(e)));
		}
	}

	recover(f: (error: Error) => T): Try<T> {
		if (this.isSuccess()) {
			return this;
		}
		try {
			return Try.success(f(this.value as Error));
		} catch (e) {
			return Try.failure(e instanceof Error ? e : new Error(String(e)));
		}
	}
}

export function syncTry<T>(f: () => T): Try<T> {
	try {
		return Try.success(f());
	} catch (e) {
		return Try.failure(e instanceof Error ? e : new Error(String(e)));
	}
}

export async function asyncTry<T>(promise: Promise<T>): Promise<Try<T>> {
	try {
		const result = await promise;
		return Try.success(result);
	} catch (e) {
		return Try.failure(e instanceof Error ? e : new Error(String(e)));
	}
}
