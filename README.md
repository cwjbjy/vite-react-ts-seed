function test(name:string,idx:number){
  return {
    name,idx
  }
}

type TestArgsType = Parameters<typeof test>
//type TestArgsType = [name: string, idx: number]