import MainLayout from "./layouts/MainLayout";
import UploadLayout from "./layouts/UploadLayout";


export default function Home() {
  return (
<>
    {/* <MainLayout>
      <div className="color-red-500 text-3xl font-bold">
        Home
      </div>
      </MainLayout> */}
      <UploadLayout>
      <div className="color-red-500 text-3xl font-bold">
        Upload
      </div>
      </UploadLayout>
</>
  );
}
