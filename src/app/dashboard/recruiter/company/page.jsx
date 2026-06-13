import CreateCompanyForm from "@/Components/Dashboard/Comapny/CreateCompanyForm";
import RecruiterCompanyCard from "@/Components/Dashboard/Recruiter/RecruiterCompanyCard";
import { getMyCompany } from "@/lib/Api/Company";
import { getUserSession } from "@/lib/ReuseableFunc/session";

const RecruiterCompanyPage = async () => {
  const user = await getUserSession();

  const company = await getMyCompany(user?.id);

const hasCompany =
  company &&
  Object.keys(company).length > 0 &&
  company._id;

return (
  <div>
    {hasCompany ? (
      <RecruiterCompanyCard company={company} />
    ) : (
      <CreateCompanyForm user={user} />
    )}
  </div>
);
};

export default RecruiterCompanyPage;