"use server"
import { prisma } from "@/utils/prisma"

export const newTask = async (tarefa:string) => {
    try{
        if(!tarefa) return
    
        const newTask = await prisma.tasks.create({
            data: {
                task: tarefa,
                done: false
            }
    })

    if (!newTask) return

        return newTask
    }catch (error){
        return error
    }
}