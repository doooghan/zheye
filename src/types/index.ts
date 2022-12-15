export interface ResponseType<P = {}> {
	code: number;
	message: string;
	data: P;
}

export interface ImageProps {
	_id?: string;
	url?: string;
	createdAt?: string;
}
export interface ColumnProps {
	_id: string;
	title: string;
	avatar?: ImageProps;
	description: string;
}

export interface PostProps {
	_id?: string;
	title: string;
	excerpt?: string;
	content: string;
	image?: ImageProps | string;
	createdAt?: string;
	column: string;
	author: UserProps | string;
}

export interface UserProps {
	isLogin: boolean;
	email?: string;
	nickName?: string;
	_id?: string;
	column?: string;
}
export interface GlobalErrorProps {
	status: boolean;
	message?: string;
}
interface ListProps<P> {
	[id: string]: P;
}

export interface GlobalDataProps {
	isLoading: boolean;
	error: GlobalErrorProps;
	token: string;
	columns: ListProps<ColumnProps>;
	posts: ListProps<PostProps>;
	user: UserProps;
}
