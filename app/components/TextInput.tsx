import { TextInputCompTypes } from "../types";

export default function TextInput({string,inputType,placeholder,error,onUpdate}: TextInputCompTypes) {
    return (
        <>
        <input 
        className="
            block
            w-full
            bg-[#F1F1F2]
            text-gray-800
            border
            border-gray-300
            rounded-md
            py-2.5
            px-3
            focus:outline-none
        "
        type={inputType} value={string || ''} autoComplete="off" placeholder={placeholder} onChange={(e) => onUpdate(e.target.value)} />

        <div className="text-[14px] font-semibold text-red-500">
            {error ? (error) : null}
        </div>
        </>
    )
}