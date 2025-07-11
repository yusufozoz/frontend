import { LevelContext } from "@/context/LevelContext";
export  default function Section ({children , level} : {children : React.ReactNode , level: number}) {
    return(
        <section className="section">
            <LevelContext value={level}>
            {children}
            </LevelContext>
        </section>
    )
}