"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;

  const router = useRouter();

  const handlechange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to Update ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to Create ticket");
      }
    }
    router.refresh();
    router.push("/");
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "hardware problem",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);
  return (
    <div className="flex justify-center">
      <form
        action=""
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update your TIcket" : "Create Your Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handlechange}
          required={true}
          value={formData.title}
        />

        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handlechange}
          required={true}
          value={formData.description}
          rows="5"
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handlechange}
        >
          <option value="hardware problem">hardware problem</option>
          <option value="software problem">software problem</option>
          <option value="project">project</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handlechange}
            value={1}
            checked={formData.priority == 1}
          />

          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handlechange}
            value={2}
            checked={formData.priority == 2}
          />

          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handlechange}
            value={3}
            checked={formData.priority == 3}
          />

          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handlechange}
            value={4}
            checked={formData.priority == 4}
          />

          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handlechange}
            value={5}
            checked={formData.priority == 5}
          />

          <label>5</label>
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handlechange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handlechange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <input
          type="submit"
          className="btn"
          value={EDITMODE ? "Update TIcket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
