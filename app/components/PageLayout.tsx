export default function PageLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="mx-auto max-w-7xl px-4 lg:px-8  w-8/12 sm:w-10/12 md:w-8/12">
            {children}
        </div>
    );
}