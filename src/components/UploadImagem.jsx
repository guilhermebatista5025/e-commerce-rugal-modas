import styles from '../pages/admin/Admin.module.css';

export default function UploadImagem({ setImage }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "SEU_PRESET");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvitgqvig/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setImage(data.secure_url);
  };

  return (
    <label className={styles.uploadButton}>
      📁 Escolher imagem
      <input
        type="file"
        onChange={handleUpload}
        className={styles.uploadInput}
        accept="image/*"
      />
    </label>
  );
}