"use client";

import { updateCompnay } from "@/lib/Actions/Company";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FiCheck, FiX } from "react-icons/fi";

export default function CompanyActions({
  company,
}) {
  const handleApprove = async (id) => {
    try {
    //   console.log("Approve Company:", company);

const result= await updateCompnay({status:"approved"},company._id);
console.log(result,"result");

if(result.matchedCount){
    toast.success(`${company.companyTitle}Company Approved`)

}
      // TODO:
      // await approveCompany(company._id);

    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
    //   console.log("Reject Company:", company);
    //   console.log("Approve Company:", company);

const result= await updateCompnay({status:"rejected"},company._id);
console.log(result,"result");
      // TODO:
      // await rejectCompany(company._id);
      if(result.matchedCount){
    toast.success(`${company.companyTitle}Company Rejected`)

}

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-2">

      {company?.status == "pending" && (
        <>
          <Button
            size="sm"
            onPress={handleApprove}
            className="bg-green-600 text-white"
          >
            <FiCheck />
            Approve
          </Button>

          <Button
            size="sm"
            onPress={handleReject}
            className="bg-orange-500 text-white"
          >
            <FiX />
            Reject
          </Button>
        </>
      )}

      {company?.status === "approved" ? (
        <span className="text-green-600 font-medium text-sm">
          Approved
        </span>
      )
    : (<span className="text-orange-500 font-medium text-sm">
          Reject
        </span>
      )
    }
    </div>
  );
}