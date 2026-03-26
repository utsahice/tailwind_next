import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function AdminContactsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return (
      <div className="p-20 text-center font-termina text-xl text-red-500 uppercase">
        Unauthorized.
      </div>
    );
  }

  // Example placeholder - you can integrate this with your actual contacts/leads table or Storyblok later
  const mockContacts = [
    { id: 1, name: "Sarah Jenkins", email: "sarah@example.com", message: "Interested in creative & marketing packages.", status: "New", date: "2024-03-24" },
    { id: 2, name: "Liam Brown", email: "liam@domain.com", message: "Need a quote for product formulation.", status: "Contacted", date: "2024-03-23" },
  ];

  return (
    <div>
      <h1 className="text-4xl font-ivy font-bold text-black mb-8 uppercase">CONTACT LEADS</h1>
      
      <div className="bg-white border rounded shadow-sm overflow-hidden text-black font-termina">
        <table className="min-w-full text-left bg-white text-xs">
          <thead className="bg-gray-50 border-b uppercase tracking-widest">
            <tr>
              <th className="py-4 px-6 border-b">Date</th>
              <th className="py-4 px-6 border-b">Name</th>
              <th className="py-4 px-6 border-b">Email</th>
              <th className="py-4 px-6 border-b">Message</th>
              <th className="py-4 px-6 border-b">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 uppercase tracking-widest">
            {mockContacts.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-6 text-gray-500">{c.date}</td>
                <td className="py-4 px-6 font-bold">{c.name}</td>
                <td className="py-4 px-6"><a href={`mailto:${c.email}`} className="text-yello hover:underline">{c.email}</a></td>
                <td className="py-4 px-6 text-gray-500 max-w-xs truncate" title={c.message}>{c.message}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded text-white bg-black`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
