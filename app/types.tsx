export interface RandowUsers {
    id: string;
    name: string;
    image: string;
}

export interface Like {
    id: string;
    user_id: string;
    post_id: string;
}
export interface Post {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
}
export interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
}
export interface PostWithProfile {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    };
}
export interface PostUserTCompTypes {
    post: Post
}
export interface ProfilePageTypes {
    params: {id:string}
}    

export interface UploadError {
    message: string;
    type: string;
}
//Layout include types
export interface MenuItemsTypes {
    iconString: string;
    colorString: string;
    sizeString: string;
}


export interface MenuItemFollowCompTypes {
    user: RandowUsers
}

//Component types
export interface PostMainTCompTypes {
    post: PostWithProfile
}

export interface PostMainLikesTCompTypes {
    post: PostWithProfile
}
