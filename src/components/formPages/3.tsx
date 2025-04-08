import { FormData } from "@/app/page";

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function Three({ formData, setFormData }: Props) {

  return (
    <div className="">
      <p>Step 3</p>
    </div>
  );
}