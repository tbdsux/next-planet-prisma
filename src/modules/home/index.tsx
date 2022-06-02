import { FormEvent, useState } from 'react';
import Seo from '../../components/Seo';
import DefaultLayout from '../../layouts/Default';

const HomePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body = { name, email, subject, message };

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        // another error in here
        console.log(res.json());
        setStatus('There was a problem trying to send the form.');
        return;
      }

      // sucessfull in here
      setStatus('Successfully sent the form, thank you.');

      // reset
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      // error handler in here
      console.error(err);
      setStatus('A problem when trying to send the form.');
    }
  };

  return (
    <DefaultLayout>
      <Seo title="Home" />

      <div className="flex items-center justify-center">
        <div className="w-2/5 p-8 mx-auto my-12 text-center shadow-lg rounded-lg">
          <form onSubmit={handleSubmit}>
            <h3>Send an Inquiry</h3>

            <div className="flex flex-col my-2">
              <label className="text-left text-sm mb-1" htmlFor="name">
                Name:
              </label>
              <input
                className="py-2 px-4 rounded-lg border text-sm"
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div className="flex flex-col my-2">
              <label className="text-left text-sm mb-1" htmlFor="email">
                Email:
              </label>
              <input
                className="py-2 px-4 rounded-lg border text-sm"
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            <div className="flex flex-col my-2">
              <label className="text-left text-sm mb-1" htmlFor="subject">
                Subject:
              </label>
              <input
                className="py-2 px-4 rounded-lg border text-sm"
                type="text"
                name="subject"
                id="subject"
                onChange={(e) => setSubject(e.currentTarget.value)}
              />
            </div>
            <div className="flex flex-col my-2">
              <label className="text-left text-sm mb-1" htmlFor="message">
                Name:
              </label>
              <textarea
                className="py-2 px-4 rounded-lg border text-sm h-40"
                name="message"
                id="message"
                onChange={(e) => setMessage(e.currentTarget.value)}
              ></textarea>
            </div>

            <p className="my-4 text-left text-gray-700 text-sm italic">{status}</p>

            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 mt-6 py-3 px-8 rounded-lg text-sm text-white"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
