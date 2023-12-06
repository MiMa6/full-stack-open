const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content courseParts={course.parts} />
      <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

const Header = ({ courseName }) => <h2>{courseName}</h2>

const Content = ({ courseParts }) =>
  <div>
    {courseParts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
  
const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

export default Course