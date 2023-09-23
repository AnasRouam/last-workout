import Card from './Card';
import legs from '../../assets/legs.png';
import push from '../../assets/push.png';
import pull from '../../assets/pull.png';
import { Link } from 'react-router-dom';

type Item = {
    id: number,
    title: string,
    description: string,
    imgUrl: string
}

const items: Item[] = [
    {
        id: 1,
        title: "Legs",
        description: "hello world",
        imgUrl: legs
    },
    {
        id: 2,
        title: "Push",
        description: "hello world",
        imgUrl: push
    },
    {
        id: 3,
        title: "Pull",
        description: "hello world",
        imgUrl: pull
    },
]



export default function Home() {
    return (
        
            <div className='grid gap-4 lg:grid-cols-3 md:grid-cols-2'>
                {items.map((item) => (
                    <Link to={'/catalog/' + item.title} key={item.id}>
                        <Card title={item.title} description={item.description} imgUrl={item.imgUrl} />
                    </Link>
                ))}
            </div>
        
    )
}