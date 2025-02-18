export default function ErrorWindow({ error }: { error: Error }) {
  return (
    <>
      <p className="font-bold text-lg text-red-600 mb-2">ERROR</p>
      <p className="text-gray-600 text-center">{error.message}</p>
    </>
  );
}
