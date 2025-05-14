"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Collection } from "@/types/nft"

interface CollectionTeamProps {
  collection: Collection
}

export function CollectionTeam({ collection }: CollectionTeamProps) {
  if (!collection.team || collection.team.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-black/40 border-gold/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collection.team.map((member, index) => (
              <div key={member.name} className="flex items-start gap-4">
                <div className="h-16 w-16 relative rounded-full overflow-hidden border-2 border-gold/30">
                  <Image
                    src={member.avatar || "/placeholder.svg?height=64&width=64&query=person"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium">{member.name}</h3>
                  <p className="text-gold text-sm mb-1">{member.role}</p>
                  {member.bio && <p className="text-gray-400 text-sm">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
