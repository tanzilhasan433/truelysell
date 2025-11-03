import BookingList from './BookingList';

export default function BookingComponent() {
  const bookings = [
    {
      id: 1,
      title: "Computer Services",
      status: "Cancelled",
      date: "27 Sep 2022, 17:00-18:00",
      amount: "$100.00",
      location: "New York, USA",
      provider: "John Doe",
      providerInfo: {
        email: "info@johndoe.com",
        phone: "+1 888 888 8888"
      }
    },
    {
      id: 2,
      title: "Car Repair Services",
      status: "Completed",
      date: "23 Sep 2022, 10:00-11:00",
      amount: "$50.00",
      location: "Alabama, USA",
      provider: "John Smith",
      providerInfo: {
        email: "info@johnsmith.com",
        phone: "+1 607-276-5393"
      }
    },
    {
      id: 3,
      title: "Interior Designing",
      status: "Inprogress",
      date: "22 Sep 2022, 11:00-12:00",
      amount: "$50.00",
      location: "Washington, DC, USA",
      provider: "Quentin",
      providerInfo: {
        email: "info@quentin.com",
        phone: "+1 601-810-9218"
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BookingList bookings={bookings} />
    </div>
  );
}
