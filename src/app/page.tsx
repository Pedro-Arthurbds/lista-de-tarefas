"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import EditTask from "@/components/edit-task";
import {
  Plus,
  Trash,
  ListChecks,
  TrashIcon,
  Sigma,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getTasks } from "@/actions/get-tasks-from-bd";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma/client";
import { newTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-tasks"
import { toast } from "sonner";
import { updateTaskStatus } from "@/actions/toggle-done";
import { LoaderCircle } from 'lucide-react';
import Filter from "@/components/filter";
import { FilterType } from "@/components/filter";
import { deleteCompletedTasks } from "@/actions/clear-completed-task";

const home = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [taskList, setTaskList] = useState<Tasks[]>([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [task, setTask] = useState<string>('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading ] = useState<boolean>(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [filteredTasks, setFilteredTask] = useState<Tasks[]>([])
  
  const handleGetTasks = async () => {
    try{

    const tasks = await getTasks()
       if(!tasks) return
    setTaskList(tasks)
  
    } catch (error){
      throw error
    }
  }

  const HandleAddTask = async () => {
    setLoading(true)
    try{
       if(task.length === 0 || !task){
        toast.error("Insira uma Atividade")
        setLoading(false)
      return
    }
    
    const myNewTask = await newTask(task)

    setTask('')

    if(!myNewTask)return

    toast.success('Atividade adicionada com sucesso ')

    await handleGetTasks()

    }catch (error){
      return error
    }
    setLoading(false)
  }

  const handleDeleteTask = async (id:string) => {
    try{
      if(!id)return

      const deletedTask = deleteTask(id) 

      if(!deletedTask) return

      toast.warning('Atividade deletada com sucesso')

      console.log(deletedTask)
      await handleGetTasks()

    } catch (error) {
      throw error
    }
    
    
    
  }

  const handleToggleTask = async (taskId: string) => {

    const previousTasks = [...taskList] //[...] clora os arrays
   
    try{
      setTaskList((prev) => {

      const updatedTaskList = prev.map(task => {
        if(task.id === taskId){
          return {
            ...task,
            done: !task.done
          } 
        } else {
            return task
          }
      })

      return updatedTaskList

    })

    await updateTaskStatus(taskId)
    
    }catch (error){
      setTaskList(previousTasks)
      throw error
    }

  }

  const clearCompletedTask = async () => {
   const deletedTasks = await deleteCompletedTasks()

    if(!deletedTasks) return

   setTaskList(deletedTasks)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    handleGetTasks()
  },[])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    switch(currentFilter){
      case "all":
        setFilteredTask(taskList)
        break
      case "pending":
        const pedingTasks = taskList.filter(task => task.done === false)
        setFilteredTask(pedingTasks)
        break
      case "completed":
        const completedTasks = taskList.filter(task => task.done === true)
        setFilteredTask(completedTasks)
        break
    }
  }, [currentFilter, taskList])

  

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar tarefa" onChange={(e)=> setTask(e.target.value)} value={task}/>
          <Button variant={"default"} className="cursor-pointer" onClick={HandleAddTask}>
            
            {loading ? <LoaderCircle className="animate-spin"/>: <Plus/>}

             Cadastrar </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

        <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

          <div className="mt-4 border-b">
            {taskList.length === 0 && <p className="text-xs border-t py-4">Voce nao possuio atividades cadastradas</p>}
            {filteredTasks.map(task => (

              <div className="h-14 flex justify-between items-center border-b border-t" key={task.id}>
              <div className={`${task.done ? 'w-1 h-full bg-green-300' : 'w-1 h-full bg-red-400'}`}></div>
              <p className="flex-1 px-3 text-sm cursor-pointer hover:text-gray-700" onClick={() => handleToggleTask(task.id)}>
                {task.task} 
              </p>
              <div className="flex items-center gap-2">
                <EditTask task={task} handleGetTasks={handleGetTasks}/> 

                <Trash size={16} className="cursor-pointer" onClick={() => handleDeleteTask(task.id)}/>
              </div>
            </div>
            ))}

          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 ">
              <ListChecks size={18} />
              <p className="text-xs"> Tarefas Concluidas ({taskList.filter(task => task.done === true).length}/{taskList.length}) </p>
          </div>



            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-xs h-7 cursor-pointer"
                  variant={"outline"} 
                >
                  <TrashIcon /> Limpar tarefas Concluidads
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir { taskList.filter(task => task.done === true).length } itens ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className="cursor-pointer" onClick={clearCompletedTask}>Sim</AlertDialogAction>
                  <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 rounded-md">


            <div
              className="h-full bg-blue-500 rounded-md mt-4"
              style={{ width: `${((taskList.filter(task => task.done).length) / taskList.length) * 100 }%` }}>
            </div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">{taskList.length} tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default home;
