
import { Like } from "../types";


const useIsLiked = (userId: string, postId: string, likes: Array<Like>) => {
    let res: Like[] = [];
    likes.forEach((like) => {
        if(like.user_id === userId && like.post_id === postId){
            res.push(like);
        }
    });
    return res.length > 0;

}

export default useIsLiked;