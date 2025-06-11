import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image';
import sbgData from "@/data/sbg.json";
import sbglogo from "@/data/sbglogo.png";

export default function SBGPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Image
                    src={sbglogo}
                    alt="SBG Logo"
                    width={70}
                    height={70}
                    className="inline-block"
                    priority
                />
                <h1 className="text-3xl font-bold">Student Body Government (SBG)</h1>
            </div>
            
            <p className="text-lg">{sbgData.description}</p>

            {sbgData.members.map((yearGroup, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{yearGroup.position}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {yearGroup.representatives.map((member, memberIndex) => (
                                <li key={memberIndex}>
                                    <strong>{member.name}</strong> - ({member.email})
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}