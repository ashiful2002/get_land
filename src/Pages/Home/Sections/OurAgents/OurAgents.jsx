import React, { use, useState } from "react";
import Section from "../../../../Components/Section/Section";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import TimeAgo from "./TimeAge/TimeAgo";
import useAuth from "../../../../Hooks/useAuth";
import { VscVerified } from "react-icons/vsc"; // classic verified check
import Social from "../../../../Shared/Footer/Social/Social";
import AgentSocial from "./AgentSocial";

const OurAgents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  console.log(users);

  if (isLoading) {
    return <span className="loading loading-dots loading-xs"></span>;
  }

  if (!user) {
    return;
    <Section title="login to show our agents"></Section>;
  } else {
    const agents = users.filter((user) => user.role === "agent");
    return (
      <Section title="Our Agents">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {agents.length > 0 ? (
            agents.map((agent) => (
              <div
                key={agent._id}
                className="indicator mx-auto w-80 card bg-base-100  shadow-xl dark:border border-gray-500/40 p-2"
              >
                <figure>
                  <img
                    src={agent.photoURL}
                    className="w-[200px] h-[200px] object-contain rounded-full"
                    alt={agent.title}
                  />
                </figure>
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="card-title capitalize text-primary">
                        {agent.name}
                      </h2>
                    </div>
                    <div className="badge badge-soft badge-secondary">
                      <VscVerified /> Verified
                    </div>
                  </div>
                  <p className="text-center">Real Estate Agent</p>
                  {/* <div className="badge badge-soft badge-secondary">
                    <VscVerified /> Verified
                  </div> */}
                  <p className="text-lg">
                    <TimeAgo lastLogin={agent.last_log_in} />
                  </p>
                  <AgentSocial className="gap-6" />
                </div>
              </div>
            ))
          ) : (
            <p>No agents found.</p>
          )}
        </div>
      </Section>
    );
  }
};

export default OurAgents;
