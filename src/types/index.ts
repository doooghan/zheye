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
	id: number;
	title: string;
	content: string;
	image?: string;
	createdAt: string;
	columnId: number;
}

export interface UserProps {
	isLogin: boolean;
	name?: string;
	id?: number;
	columnId?: number;
}
export interface GlobalDataProps {
	column: ColumnProps[];
	posts: PostProps[];
	user: UserProps;
}
