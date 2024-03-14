export type User = {
	id: string;
	username: string;
	email: string;
	name: {
		first: string;
		last: string;
		full: string;
	};
	password?: string;
	created_at: Date;
};
