import { getStoreById, getStoreByUserIdAndStoreId } from "@/data/store";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const { storeId } = await params;

  const store = await getStoreById(storeId);
  if (!store) {
    return <div>Store not found</div>;
  }
  return <div>store name: {store.name}</div>;
};

export default DashboardPage;
