import { useProvince } from "@/hooks/query/useProvince";

export default function ProvincePage() {
  const { data, isLoading } = useProvince();

  console.log(data);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data && (
        <ul>
          {data.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
