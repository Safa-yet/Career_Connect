"use client";

import {
  Tabs,
  Card,
  Button,
} from "@heroui/react";
import Link from "next/link";

import { FiCheck } from "react-icons/fi";

const seekerPlans = [
  {
    name: "Free",
    id : "seeker_free",
    price: "$0",
    description: "Forever free plan",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
  },
  {
    name: "Pro",
    id : "seeker_pro",
    price: "$19/mo",
    popular: true,
    description: "Best for active job seekers",
    features: [
      "Apply to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
  },
  {
    name: "Premium",
    id : "seeker_premium",
    price: "$39/mo",
    description: "Maximum career growth",
    features: [
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id : "recruiter_free",
    price: "$0",
    description: "Perfect for new recruiters",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
      "Great for first year hiring",
    ],
  },
  {
    name: "Growth",
    id : "recruiter_pro",
    price: "$49/mo",
    popular: true,
    description: "Ideal for growing teams",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Enterprise",
    id : "recruiter_premium",
    price: "$149/mo",
    description: "Advanced recruiting solution",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
  },
];

function PlanCard({
  name,
  id,
  price,
  description,
  features,
  popular,
}) {
  return (
    <Card
      className={`relative p-8 rounded-3xl border border-gray-100 shadow-lg h-full ${
        popular
          ? "ring-2 ring-[#00B96D] scale-[1.02]"
          : ""
      }`}
    >
      {popular && (
        <div className="absolute top-5 right-5 bg-[#00B96D] text-white px-3 py-1 rounded-full text-xs font-medium">
          Most Popular
        </div>
      )}

      <Card.Content className="flex flex-col h-full">
        <div>
          <h3 className="text-2xl font-bold text-[#091E21]">
            {name}
          </h3>

          <div className="mt-5">
            <span className="text-5xl font-bold text-[#091E21]">
              {price}
            </span>
          </div>

          <p className="text-gray-500 mt-4">
            {description}
          </p>
        </div>

        <div className="mt-8 space-y-4 flex-grow">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-3"
            >
              <FiCheck className="text-[#00B96D] mt-1 shrink-0" />

              <span className="text-gray-700 text-sm">
                {feature}
              </span>
            </div>
          ))}
        </div>
         <form action="/api/checkout_sessions" method="POST">
      <section>
        <input type='hidden' name="plan_id" value={id}/>
      
         <Button type="submit" role="link" className="w-full mt-8 bg-[#00B96D] text-white">Checkout        </Button>
      </section>
    </form>
       
      </Card.Content>
    </Card>
  );
}

export default function PricingPage() {
  return (
    <section className="bg-[#F4F6F8] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-5">
        {/* Hero */}

        <div className="text-center mb-16">
          <div className="inline-flex bg-[#DFF8EC] text-[#00B96D] px-4 py-2 rounded-full text-sm font-medium">
            Pricing Plans
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#091E21] mt-6">
            Choose Your Perfect Plan
          </h1>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5">
            Whether you're looking for your next opportunity
            or hiring top talent, we have a plan designed
            specifically for your needs.
          </p>
        </div>

        {/* Tabs */}

        <Tabs defaultValue="seekers">
          <Tabs.ListContainer className="flex justify-center mb-12 ">
            <Tabs.List
              aria-label="Pricing Plans"
              className="bg-white rounded-2xl p-2 shadow-md border border-gray-100"
            >
              <Tabs.Tab
                id="seekers"
                className="px-8 py-3 font-medium"
              >
                Job Seekers
                <Tabs.Indicator />
              </Tabs.Tab>

              <Tabs.Tab
                id="recruiters"
                className="px-8 py-3 font-medium"
              >
                Recruiters
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          {/* Job Seeker Plans */}

          <Tabs.Panel id="seekers">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seekerPlans.map((plan) => (
                <PlanCard
                  key={plan.name}
                  {...plan}
                />
              ))}
            </div>
          </Tabs.Panel>

          {/* Recruiter Plans */}

          <Tabs.Panel id="recruiters">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recruiterPlans.map((plan) => (
                <PlanCard
                  key={plan.name}
                  {...plan}
                />
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>

        {/* CTA */}

        <div className="mt-24">
          <div className="bg-[#043330] rounded-[32px] p-12 text-center">
            <h2 className="text-4xl font-bold text-white">
              Ready To Grow Your Career?
            </h2>

            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Join thousands of professionals and companies
              already using Career Connect to find jobs,
              hire talent, and grow faster.
            </p>

            <Button className="mt-8 bg-[#00B96D] text-white px-8">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}