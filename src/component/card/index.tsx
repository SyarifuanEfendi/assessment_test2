type CardProps = {
    title: string;
    children: React.ReactNode;
}

const LayoutWrapper = (p: CardProps) => {
    return (
        <div className='m-4 bg-white p-4 shadow-sm'>
            <p className='text-2xl border-b border-b-slate-200 mb-3'>{p.title}</p>
            {p.children}
        </div>
    );
}

export default LayoutWrapper;