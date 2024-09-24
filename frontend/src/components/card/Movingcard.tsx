import React from "react"
import tonyning from "@/../public/business-woman.png"
import shrutidua from "@/../public/business-woman.png"
import samvalji from "@/../public/business-woman.png"
import avatar from "@/../public/business-woman.png"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

export default function MovingCard() {
  return (
    <>
      <div className=" mx-auto bg-gray-950 pt-10  text-center">
        <h2 className="aaa inline-block text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl">
          What people say about us! <br />{" "}
        </h2>
        <p className="mt-6 text-xl text-gray-500">
          {" "}
          Over 100+ people trust us.
        </p>
      </div>
      <div className=" flex flex-col items-center justify-center  overflow-hidden rounded-md  py-10 antialiased lg:py-12">
        <div className="relative">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            // className="pt-10"
          />
        </div>

        <div>
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
            // className="pb-10"
          />
        </div>
      </div>
    </>
  )
}

const testimonials = [
  {
    quote:
      "SixDesign.ca delivers exceptional web design, exceeding expectations with professionalism, creativity, and seamless communication. Highly recommended for outstanding results.",
    name: "Tony Ning",
    title: "Real Estate Broker",
    img: tonyning,
  },
  {
    quote:
      "Transformative web design services by SixDesign.ca redefine online presence. With creativity, professionalism, and seamless communication, they ensure remarkable results. Highly recommended.",
    name: "Shruti Dua",
    title: "Sales Representive",
    img: shrutidua,
  },
  {
    quote:
      "Elevate your online presence with exceptional web design services from SixDesign.ca. Experience creativity, professionalism, and seamless communication for remarkable results.",
    name: "Sam Valji",
    title: "Environment Engineer",
    img: samvalji,
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "Jane Austen",
    title: "CEO, SixDesign.ca",
    img: avatar,
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "CEO, Garima Bikas Bank",
    img: avatar,
  },
]
