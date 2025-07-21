
export interface UserContextTypes {
    user: User | null;
    register(name: string, email: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
    checkUser(): Promise<void>;
}

export interface User {
    id: string;
    name: string;
    bio: string;
    image: string;
}

export interface RandomUsers {
    id: string;
    name: string;
    image: string;
}

export interface ShowErrorObject {
    message: string;
    type: string;
}
export interface CropperDimensions {
    left?: number | null;
    top?: number | null;
    width?: number | null;
    height?: number | null;

}

export interface Profile {
    id: string;
    user_id: string;
    name: string;
    bio: string;
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
    params: Promise<{ id: string }>
}
export interface CommentWithProfile {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    };
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
    user: RandomUsers
}

//Component types
export interface PostMainTCompTypes {
    post: PostWithProfile
}

export interface PostMainLikesTCompTypes {
    post: PostWithProfile
}

export interface CommentsTypes {
    params: {
        postId: string;
        userId: string;
    }

}
export interface SingleCommentTypes {
    comment: CommentWithProfile,
    params: {
        postId: string;
        userId: string;
    }

}

export interface TextInputCompTypes {
    string: string;
    inputType: string;
    placeholder: string;
    error: string;
    onUpdate: (newValue: string) => void;
}

export interface PostPageTypes {
    params: Promise<{
        postId: string;
        userId: string;
    }>
}

export interface CommentsHeaderTypes {
    post: PostWithProfile;
    params: {
        postId: string;
        userId: string;
    }
}