import { Link } from 'react-router-dom'

function WhatItMeansPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1>What's a Good Wee Place?</h1>
        <div style={{ marginTop: '2rem' }}>
          <p className="text-body-large">
            A Good Wee Place is somewhere you can just be yourself.
          </p>
          <p className="text-body-large">
            It's a café where you can grab a coffee without worrying about the queue for the loo. A pub where you can meet your pals without that knot in your stomach. A restaurant where you're welcomed for who you are, not questioned about it.
          </p>
          <p className="text-body-large">
            For trans and genderqueer people, finding spaces like this isn't always easy. Recent headlines and confusing guidance have made many venues feel uncertain—and that uncertainty gets passed on to customers. Nobody should have to plan their night out around which toilets they can safely use.
          </p>
          <p className="text-body-large">
            Good Wee Places have decided to be clear about where they stand.
          </p>

          <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>What makes a Good Wee Place?</h2>
          <p className="text-body-large" style={{ marginBottom: '1rem' }}>
            Venues displaying our sticker have agreed to:
          </p>
          <ul className="list-content">
            <li className="list-item-content">
              <strong>Respect everyone's identity</strong> — Use the names and pronouns people ask you to use, without question or debate.
            </li>
            <li className="list-item-content">
              <strong>Challenge discrimination</strong> — Speak up when transphobia or gender-based discrimination happens in your space.
            </li>
            <li className="list-item-content">
              <strong>Provide safe facilities</strong> — Allow people to use the bathroom that aligns with their gender.
            </li>
            <li className="list-item-content">
              <strong>Educate the team</strong> — Train staff to be respectful and supportive of trans and genderqueer customers and colleagues.
            </li>
            <li className="list-item-content">
              <strong>Listen and learn</strong> — Be open to feedback and willing to improve.
            </li>
          </ul>
          <p className="text-body-large" style={{ marginTop: '1.5rem' }}>
            None of this requires structural changes or complicated policies. It's simply a commitment to kindness, inclusion, and common sense.
          </p>

          <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Why does it matter?</h2>
          <p className="text-body-large">
            When a venue puts up a Good Wee Place sticker, they're saying something simple but powerful: you're welcome here, exactly as you are.
          </p>
          <p className="text-body-large">
            That visible signal makes a real difference. It means trans people can plan a night out with confidence. It means families and friends know where to go. And it means Glasgow becomes the kind of city we all want to live in—one where everyone can enjoy going out without fear or discomfort.
          </p>

          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Looking for a Good Wee Place?</h2>
            <p className="text-body-large">
              Check out our <Link to="/" style={{ textDecoration: 'underline' }}>map</Link> to find welcoming venues across the city.
            </p>
            <h2 style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>Want to become one?</h2>
            <p className="text-body-large">
              If you run a venue and share these values, <Link to="/forms?type=sticker" style={{ textDecoration: 'underline' }}>request your free sticker</Link> and join us. It's a small thing that means a lot.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatItMeansPage
