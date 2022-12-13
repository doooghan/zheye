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
	_id: string;
	title: string;
	excerpt: string;
	content: string;
	image?: ImageProps;
	createdAt: string;
	column: string;
}

export interface UserProps {
	isLogin: boolean;
	email?: string;
	nickName?: string;
	_id?: string;
	column?: number;
}
export interface GlobalDataProps {
	isLoading: boolean;
	token: string;
	columns: ColumnProps[];
	posts: PostProps[];
	user: UserProps;
}