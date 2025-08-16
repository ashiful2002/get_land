import React from "react";
import Section from "../../../../Components/Section/Section";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SoldProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: agentSales = [], isLoading } = useQuery({
    queryKey: ["agentSales", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/make-offer?agent_email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const soldOffers = agentSales.filter((offer) => offer.status === "bought");
  const totalSalesAmount = soldOffers.reduce(
    (sum, offer) => sum + parseFloat(offer.offerAmount || 0),
    0
  );

  // PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Sold Properties Report", 14, 22);

    doc.setFontSize(12);
    doc.text(`Agent: ${user?.email}`, 14, 30);
    doc.text(`Total Sales: $${totalSalesAmount.toFixed(2)}`, 14, 36);

    const tableColumn = [
      "#",
      "Property Title",
      "Buyer",
      "Email",
      "Price Offered",
      "Status",
      "Transaction ID",
    ];

    const tableRows = soldOffers.map((offer, index) => [
      index + 1,
      offer.title || "N/A",
      offer.buyerName || "N/A",
      offer.buyerEmail || "N/A",
      `$${offer.offerAmount}`,
      offer.status,
      offer.transaction_Id || "N/A",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save(`Sold_Properties_${user?.email}.pdf`);
  };

  return (
    <Section title="My Sold Properties">
      {soldOffers.length === 0 ? (
        <p className="text-center text-gray-500">No properties sold yet.</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-green-700">
              Total Sales: ${totalSalesAmount.toFixed(2)}
            </h3>
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>

          <div className="overflow-x-auto p-4 rounded shadow">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Property Title</th>
                  <th>Buyer</th>
                  <th>Price Offered</th>
                  <th>Status</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {soldOffers.map((offer, index) => (
                  <tr key={offer._id}>
                    <td>{index + 1}</td>
                    <td>{offer.title || "N/A"}</td>
                    <td>
                      {offer.buyerName || "N/A"} <br />
                      <span className="text-sm text-gray-500">
                        {offer.buyerEmail}
                      </span>
                    </td>
                    <td>${offer.offerAmount}</td>
                    <td>
                      <span className="badge badge-success text-white capitalize">
                        {offer.status}
                      </span>
                    </td>
                    <td>{offer.transaction_Id || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Section>
  );
};

export default SoldProperties;
