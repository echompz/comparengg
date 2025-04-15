// pages/upload.tsx
import DocumentUploader from 'app/components/DocumentUploader';

export default function UploadPage() {
  return (
    <section>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        CpE Undertaking Generator
      </h1>
      <p className="mb-4">
        {`This site does not store any personal data. We do not collect, retain, or share any information that could identify you.`}
      </p>
      <DocumentUploader />
    </section>
  );
}