import Form from 'next/form'

export default function Home() {
  return (
    <Form action="" className='bg-blue-800 flex flex-col items-center justify-center h-screen p-2 m-1 gap-8'>
      <input className='bg-amber-800' type="number" placeholder="Digite a potencia em Watts" />
      <input type="number" placeholder='Quantas horas de uso desse aparelho por dia?' />
      <input type="number" placeholder='Quantas dias de uso desse aparelho por mes?' />
      <input type="number" placeholder='Qual valor cobrado pelo KW/H?' />
      <button type='submit' >Calcular</button>
    </Form>
  );
}
