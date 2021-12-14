

type CardProps = {
  title: string,
  body: string
}

export const Card = ({ title, body }: CardProps) => <div>
  <h2>{ title }</h2>
  <p>
    { body }
  </p>
</div>

