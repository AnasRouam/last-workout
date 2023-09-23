

export default function Card(props: { title: string, description: string, imgUrl: string }) {
    return (
        <div className="bg-white text-slate-800 w-80 m-4 border rounded-xl flex flex-col overflow-hidden hover:scale-105 transition-all">
            <img className="w-80 pt-4" src={props.imgUrl} alt="Nike Air Force" />
            <div className="p-4 flex flex-col items-center justify-center">
                <h2 className="text-xl pb-2 font-bold">{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    )
}