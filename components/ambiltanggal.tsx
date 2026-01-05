"use client"

import { useEffect, useState } from "react"

export function AmbilTanggal() {
  const [date, setDate] = useState("")

  useEffect(() => {
    const now = new Date()

    const formatter = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    })

    const formatted = formatter.format(now).replace(/\//g, "-")
    setDate(formatted)
  }, [])

  return <span>{date}</span>
}
