export function Card({ children }) {
    return <div className="border p-4 rounded-lg shadow-md">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
  }
  export function CardTitle({ children }) { 
    return <h2 className="text-lg font-semibold">{children}</h2>;
  }
  export function CardBody({ children }) {
    return <div className="p-2">{children}</div>;
  }
  export function CardFooter({ children }) {
    return <div className="p-2">{children}</div>;
  }
  export function CardImage({ src, alt }) {
    return <img src={src} alt={alt} className="w-full" />;
  }
  export function CardHeader({ children }) {
    return <div className="p-2">{children}</div>;
  }
  