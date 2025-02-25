import { uploadProfilePic } from "@/lib/api";
import { Button } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

const ImageUpload = () => {
	const [image, setImage] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFile(file);
			const reader = new FileReader();
			reader.onload = () => setImage(reader.result as string);
			reader.readAsDataURL(file);
		}
	};
	let queryCLient = useQueryClient()
	let onUpload = async () => {
		try {
			await toast.promise(uploadProfilePic(file), {
				pending: "uploading",
				success: "uploaded",
				error: "failed to upload",
			});
			queryCLient.invalidateQueries({
				queryKey:["userData"]
			})
		} catch (err) {
			throw new Error("failed");
		}
	};
	return (
		<div className="flex flex-col gap-2 p-2 py-4">
			<div className="size-32 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
				{image ? (
					<img
						src={image}
						alt="Selected"
						className="object-cover w-full h-full"
					/>
				) : (
					"No Image"
				)}
			</div>

			<input
				name="imageSelector"
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
			/>
			<Button
				className={"mt-2"}
				onClick={onUpload}
			>
				Upload
			</Button>
		</div>
	);
};

export default ImageUpload;
