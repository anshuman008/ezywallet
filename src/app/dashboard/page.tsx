'use client'
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { Button } from "@/components/ui/button"
import { Heading, Strong, Text } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
const Page = () => {

    const router = useRouter();
    return (
        <BackgroundBeamsWithCollision>
            <div className="h-screen flex justify-center items-center">
                <div className="flex flex-col gap-y-2 justify-center items-center">
                    <Heading className="text-6xl font-bold">EzyWallet supports multiple blockchains
                    </Heading>
                    <Text as="label" className="text-3xl">Choose a <Strong className="text-orange-500">blockchain</Strong> to get started.</Text>
                    <div className="w-full flex gap-4 justify-center items-center">
                        <Button className="text-lg" onClick={()=>router.push('/create')}>Get Started</Button>
                        {/* <Button className="text-lg"onClick={()=>router.push('/wallates')}>Etherium</Button> */}
                    </div>
                </div>
            </div>
        </BackgroundBeamsWithCollision>
    )
}

export default Page