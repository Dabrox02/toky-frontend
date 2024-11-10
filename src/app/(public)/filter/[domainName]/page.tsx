import { HtmlContent } from "@/components/HtmlContent";
import { Message } from "@/types/messageInterface";
import Link from "next/link";

interface Props {
  params: Promise<{
    domainName: string;
  }>;
  searchParams: Promise<{
    name: string;
  }>;
}

export default async function FilterPage({ params, searchParams }: Props) {
  const { domainName } = await params;
  const { name } = await searchParams;

  const mails = await getMails({ domainName, name });

  if (!name) {
    return (
      <div>
        Proveer una categoria
        <Link href={`/filter/jtvpremium?name=netflix`}>Buscar</Link>
      </div>
    );
  }

  if (!mails) {
    return <div>No se encontraron Emails</div>;
  }

  return (
    <div>
      {mails.map((mail, index: number) => {
        return (
          <div key={index} className="p-4">
            <h2>{mail.subject}</h2>
            <p>From: {mail.from}</p>
            <p>Date: {new Date(mail.date).toLocaleString()}</p>
            <HtmlContent htmlString={mail.body} />
          </div>
        );
      })}
    </div>
  );
}

const getMails = async ({
  domainName,
  name,
}: {
  domainName: string;
  name: string;
}) => {
  const response = await fetch(
    `http://localhost:3001/mails/filter/${domainName}?name=${name}`
  );
  const mails = await response.json();
  if (mails.message) return null;
  return mails as Message[];
};
