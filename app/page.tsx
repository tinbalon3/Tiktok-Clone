import { text } from "stream/consumers";
import ClientOnly from "./components/ClientOnly";
import MainLayout from "./layouts/MainLayout";
import UploadLayout from "./layouts/UploadLayout";
import { profile } from "console";
import PostMain from "./components/PostMain";


export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="mt-[80px] w-[calc(100% - 90px)] max-w-[690px] ml-auto">
          <ClientOnly>
            <PostMain
              post={{
                id: '1',
                user_id: '1',
                video_url: '/video_demo.mp4',
                text: 'This is a sample video post',
                created_at: '2023-10-01T12:00:00Z',
                profile: {
                  user_id: '1',
                  name: 'John Weeks Dev',
                  image: 'https://tse3.mm.bing.net/th/id/OIP.J8d82ByQ3JYt-EuiR0tIzwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
                },
              }}
            />

          </ClientOnly>
        </div>
      </MainLayout>
      {/* <UploadLayout>
      <div className="color-red-500 text-3xl font-bold">
        Upload
      </div>
      </UploadLayout> */}
    </>
  );
}
