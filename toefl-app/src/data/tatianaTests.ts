// Tatiana's TOEFL Practice Tests — Speaking & Writing Data
// 11 full tests with Listen & Repeat, Take an Interview, Build a Sentence, Write an Email, Academic Discussion

export interface RepeatSentence {
  id: number;
  text: string;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  sampleAnswer: string;
}

export interface BuildSentenceItem {
  id: number;
  prompt: string;       // The original context sentence shown to the user
  scrambled: string;    // The scrambled word bank
  answer: string;       // The correct reconstructed sentence
}

export interface TatianaTest {
  testNumber: number;
  title: string;

  // Listen & Repeat
  listenRepeat: {
    scenario: string;
    sentences: RepeatSentence[];
  };

  // Take an Interview
  interview: {
    scenario: string;
    questions: InterviewQuestion[];
  };

  // Writing (optional — test 11 is speaking-only)
  writing?: {
    buildSentence: BuildSentenceItem[];
    writeEmail: {
      situation: string;
      task: string[];
      to: string;
      subject: string;
      sampleAnswer: string;
    };
    academicDiscussion: {
      professorPrompt: string;
      student1: { name: string; post: string };
      student2: { name: string; post: string };
      sampleAnswer: string;
    };
  };
}

export const tatianaTests: TatianaTest[] = [
  {
    testNumber: 1,
    title: "Cafeteria & Study Abroad Scholarship",
    listenRepeat: {
      scenario: "You are preparing to help students at the cafeteria. Listen to the speaker and repeat what he says. Repeat only once.",
      sentences: [
        { id: 1, text: "This is the main student cafeteria." },
        { id: 2, text: "Breakfast is served until 10:30." },
        { id: 3, text: "Hot meals are available for lunch and dinner." },
        { id: 4, text: "Vegetarian and gluten-free options are clearly labeled." },
        { id: 5, text: "Please return your trays after finishing your meal." },
        { id: 6, text: "You can pay with your student card or credit card at the register." },
        { id: 7, text: "Weekly menus are posted online and on the notice board." },
      ],
    },
    interview: {
      scenario: "You are applying for a scholarship to study abroad. You will have a short online interview with a committee member.",
      questions: [
        {
          id: 1,
          question: "Have you ever traveled to another country? If yes, where did you go and for how long?",
          sampleAnswer: "Yes, I have traveled to another country. Last summer, I went to Spain for two weeks. The purpose of the trip was both tourism and to practice my Spanish skills. I visited Madrid, Barcelona, and Seville, exploring cultural landmarks, trying local cuisine, and interacting with locals. I also participated in a short language course to improve my speaking. By the end of the trip, I felt much more confident communicating in Spanish and understanding cultural nuances. This experience taught me the importance of planning ahead, being open-minded, and embracing new environments. Traveling broadened my perspective and strengthened my independence.",
        },
        {
          id: 2,
          question: "What do you think would be the most exciting and the most difficult aspect of studying abroad for you personally?",
          sampleAnswer: "The most exciting aspect of studying abroad for me would be discovering a new culture and making international friends. Being immersed in a different environment would allow me to learn not just academically but also socially, which is very motivating. On the other hand, the most difficult aspect might be adjusting to a different education system and overcoming language barriers. To prepare, I plan to practice the language in advance and develop strong time-management habits. I believe facing these challenges will help me grow personally and academically, making the experience both exciting and rewarding in the long run.",
        },
        {
          id: 3,
          question: "Some people believe studying abroad helps students become more independent and adaptable. Others think it can create difficulties with culture shock and loneliness. What is your opinion and why?",
          sampleAnswer: "I believe studying abroad helps students become more independent and adaptable. Living in a foreign country requires managing daily life, making decisions, and solving problems without relying on family, which develops independence. It also exposes students to new cultures, helping them become flexible and open-minded. Of course, culture shock and loneliness can occur, but I see these as opportunities to develop resilience. For example, during my travel to Spain, I initially struggled with unfamiliar customs but quickly adapted by observing and asking questions. Overall, the benefits of personal growth and cultural understanding outweigh the temporary challenges, making studying abroad a valuable experience.",
        },
        {
          id: 4,
          question: "Should governments encourage more students to study abroad, or should they focus on improving education at home?",
          sampleAnswer: "In my view, governments should encourage students to study abroad while also improving education at home. Studying abroad exposes students to global perspectives, enhances language skills, and fosters independence, which benefits both the student and society. For example, students returning from international programs often bring new ideas and approaches to their communities. At the same time, improving education domestically ensures that students who cannot travel still receive high-quality learning opportunities. Balancing both strategies allows governments to support inclusive access to international experiences while strengthening the overall education system, helping students succeed in a globalized world without leaving anyone behind.",
        },
      ],
    },
    writing: {
      buildSentence: [
        { id: 1, prompt: "I can't believe how hot it is today.", scrambled: "degrees/is/many/it/how/ outside today", answer: "How many degrees is it outside today?" },
        { id: 2, prompt: "You are going to the bookstore this afternoon, right?", scrambled: "want/you/me / you anything/do/ to get", answer: "Do you want me to get you anything?" },
        { id: 3, prompt: "Did you hear the news about Tom?", scrambled: "he/a new/got/city/in the / job", answer: "He got a new job in the city." },
        { id: 4, prompt: "I'm thinking of redecorating my room.", scrambled: "colors are / what/you/choose / going to", answer: "What colors are you going to choose?" },
        { id: 5, prompt: "I can't find my phone anywhere.", scrambled: "last/ the /table/saw/1/kitchen", answer: "I saw it on the kitchen table last." },
        { id: 6, prompt: "I'm so tired after work.", scrambled: "take/nap/you/a/should / maybe / little", answer: "Maybe you should take a little nap." },
        { id: 7, prompt: "I really liked the lecture this morning.", scrambled: "in/the/who/professor/was", answer: "Who was the professor?" },
        { id: 8, prompt: "I might join the gym near campus.", scrambled: "any/members/ are / of /friends / your", answer: "Are any of your friends members already?" },
        { id: 9, prompt: "My parents are visiting next week.", scrambled: "they/for/how/staying/are/long", answer: "How long are they staying?" },
        { id: 10, prompt: "The bakery downtown just reopened.", scrambled: "bread / offering/ they/what/are/types / of", answer: "What types of bread are they offering?" },
      ],
      writeEmail: {
        situation: "You are the president of your university's photography club. The club booked a guest speaker, but the speaker just canceled.",
        task: ["Explain the situation.", "Apologize for the inconvenience.", "Suggest an alternative activity for the meeting."],
        to: "Club Members",
        subject: "Speaker Unable to Attend",
        sampleAnswer: "Dear Club Members,\n\nI am writing to inform you that our guest speaker, who was scheduled to present at today's meeting, had to cancel at the last minute due to an unexpected personal issue.\n\nI sincerely apologize for any inconvenience this may cause and for the short notice.\n\nInstead of canceling the meeting, I suggest that we use this time for a group activity. We can review and discuss members' recent photos, share feedback, and exchange tips on composition and editing. I believe this will still be a valuable and engaging session for everyone.\n\nThank you for your understanding, and I hope to see you at the meeting.\n\nBest regards,\nLily White",
      },
      academicDiscussion: {
        professorPrompt: "Many cities are investing in bike lanes to encourage cycling as a healthier and more environmentally friendly alternative to driving. Supporters argue that bike lanes reduce traffic, improve air quality, and promote exercise. Critics say they take up valuable road space and can cause accidents when cars and bikes mix. Do you think cities should continue to expand bike lane networks, or should they focus on other forms of transportation?",
        student1: { name: "Mia", post: "I think cities should continue to expand bike lanes because cycling is one of the cleanest forms of transport. It reduces pollution and helps people improve their health at the same time." },
        student2: { name: "Mike", post: "I don't think expanding bike lanes should be the priority for most cities. Not everyone is able or willing to cycle, especially in places with bad weather or long commuting distances. Bike lanes can also create traffic issues when roads are already crowded. Cities should invest more in public transport, which can benefit a larger number of people." },
        sampleAnswer: "I agree that cities should continue to expand bike lanes, but they should do so carefully and as part of a broader transportation plan. As Mia mentioned, cycling is an environmentally friendly option that reduces pollution and encourages people to stay active. These benefits are especially important in large cities with serious traffic and air quality problems.\n\nHowever, I also understand Mike's concern that bike lanes may not work for everyone, particularly in areas with bad weather or long commuting distances. For this reason, I think cities should expand bike lanes mainly in central areas while also investing in reliable public transportation. This combined approach can help more people choose sustainable ways to travel.",
      },
    },
  },
  {
    testNumber: 2,
    title: "University Orientation & Online Learning",
    listenRepeat: {
      scenario: "You are learning to welcome exchange students during orientation. Listen to the speaker and repeat what she says. Repeat only once.",
      sentences: [
        { id: 1, text: "Welcome to our university." },
        { id: 2, text: "Orientation sessions start at nine in the auditorium." },
        { id: 3, text: "After the session, student guides will show you around campus." },
        { id: 4, text: "Please carry your ID card with you at all times." },
        { id: 5, text: "Housing assistance is available at the residence office." },
        { id: 6, text: "You will also receive information about clubs and organizations." },
        { id: 7, text: "If you have questions, our staff will gladly help." },
      ],
    },
    interview: {
      scenario: "You have volunteered for a research study about online learning. You will have a short online interview with a researcher.",
      questions: [
        {
          id: 1,
          question: "Have you ever taken an online class? If so, what was it about?",
          sampleAnswer: "Yes, I have taken an online class. Last year, I completed a course on digital marketing. I had to learn about marketing strategies, social media campaigns, and analytics. To succeed, I attended live sessions, completed weekly assignments, and participated in discussion forums. As a result, I gained practical knowledge and could apply it to small projects, improving my skills in content creation and marketing strategy. Reflecting on the experience, I realized that online classes require discipline and self-motivation, but they also offer flexibility. Overall, it was an enriching experience that taught me how to manage time effectively and learn independently.",
        },
        {
          id: 2,
          question: "What do you think are the main advantages and disadvantages of online learning compared to traditional classroom learning?",
          sampleAnswer: "I believe the main advantages of online learning are flexibility and accessibility. Students can study at their own pace and access materials from anywhere, which is especially helpful for those with jobs or family responsibilities. The main disadvantages are reduced social interaction and less immediate feedback from instructors. For example, in my digital marketing class, I could study after work but sometimes waited for replies to my questions. In contrast, traditional classrooms offer real-time interaction and a structured environment. Overall, online learning works well for motivated students who manage their time effectively, but it may be less suitable for those who need constant guidance.",
        },
        {
          id: 3,
          question: "Some people argue that online education is just as effective as in-person classes. Others strongly disagree. What is your opinion?",
          sampleAnswer: "In my opinion, online education can be just as effective as in-person classes if students are disciplined and use available resources. This is because quality content, interactive tools, and assessments can replicate most classroom experiences. For example, in my online marketing course, I learned theory, completed practical assignments, and received feedback, which helped me achieve my learning goals. Additionally, I could review recorded lectures multiple times, something impossible in a live class. Therefore, while face-to-face interaction has benefits, well-structured online courses can provide comparable outcomes if students are motivated, making online learning an effective alternative for many people.",
        },
        {
          id: 4,
          question: "How do you think the growth of online learning might change universities over the next 20 years?",
          sampleAnswer: "I think the growth of online learning will significantly change universities over the next 20 years. Universities will likely offer more hybrid and fully online programs to reach global students. Technology allows access to high-quality education without geographical limits. For example, many prestigious institutions already provide online degrees, and this trend will continue. Students may choose courses from multiple universities rather than attending one campus exclusively. This could make education more flexible, personalized, and inclusive, but universities will also need to focus on building community and collaboration online. Overall, online learning will expand opportunities while encouraging universities to innovate and adapt.",
        },
      ],
    },
    writing: {
      buildSentence: [
        { id: 1, prompt: "I'm worried about the math test tomorrow.", scrambled: "session/has/tonight/have/we/could/a study", answer: "We could have a study session tonight." },
        { id: 2, prompt: "The café near the park has a great coffee.", scrambled: "there/ever/been / have / you / to", answer: "Have you ever been there?" },
        { id: 3, prompt: "My cousin is getting married in July.", scrambled: "wedding/where/ the / held / is", answer: "Where is the wedding held?" },
        { id: 4, prompt: "I lost my umbrella this morning.", scrambled: "could/one/store/go/you/get/to/at the", answer: "You could get another one at the store." },
        { id: 5, prompt: "Our professor canceled class today.", scrambled: "a/meeting/an/ have / instead/we'll", answer: "We'll have an online meeting instead." },
        { id: 6, prompt: "I'm looking for a part-time job.", scrambled: "apply/job/where/to/going/are/you", answer: "Where are you going to apply?" },
        { id: 7, prompt: "My friend just moved into a new apartment.", scrambled: "he/much/how/rent/does/pay", answer: "How much rent does he pay?" },
        { id: 8, prompt: "The concert tickets sold out fast.", scrambled: "another /think/concert/they will / you / have / when / do", answer: "When do you think they will have another concert?" },
        { id: 9, prompt: "I need to print my assignment.", scrambled: "printers / the / on the / floor / second / are", answer: "The printers are on the second floor." },
        { id: 10, prompt: "I really liked the restaurant we tried yesterday.", scrambled: "dish/favorite/your/was/what/there", answer: "What was your favorite dish there?" },
      ],
      writeEmail: {
        situation: "You reserved a study room in the library, but when you arrived, it was already occupied.",
        task: ["Describe the problem.", "Explain why you need the room.", "Ask for a solution."],
        to: "Library staff",
        subject: "Study Room Reservation",
        sampleAnswer: "Dear Library Staff,\n\nI am writing to inform you of a problem with my study room reservation today. I reserved Room 204 from 2:00 to 4:00 p.m., but when I arrived, the room was already occupied by another group. They mentioned that they had been using it for some time, and there was no indication that the room had been reserved.\n\nI specifically booked this room because I have an important online meeting for a group project, and I need a quiet and private space to participate. Without access to the room, it is difficult for me to complete my work effectively.\n\nCould you please look into this matter and let me know if another room is available or if the reservation system can be checked?\n\nThank you for your assistance.\n\nBest regards,\nLily White",
      },
      academicDiscussion: {
        professorPrompt: "Some countries have recently shortened the standard workweek to four days instead of five. Supporters say this leads to better work-life balance, higher productivity, and happier employees. Critics worry that it could harm businesses and reduce overall output. Do you think a four-day workweek is a good idea? Why or why not?",
        student1: { name: "Lucy", post: "I think a four-day workweek is a great idea because people are more productive when they rest more. Working fewer but more focused days can improve results and give employees more time for family and relaxation." },
        student2: { name: "Marshall", post: "I don't support a shorter workweek because some industries need constant attention. Paying the same salary for fewer hours could hurt businesses, and some employees might still work long, stressful days." },
        sampleAnswer: "I agree with Lucy that a four-day workweek can increase productivity because employees are likely to feel more rested and motivated. When people have an extra day to relax or spend time with family, they may return to work with greater concentration and energy. In many office-based jobs, productivity depends more on focus and efficiency than on the number of hours spent at a desk. Therefore, fewer but more focused workdays could actually improve results.\n\nHowever, I also understand Marshall's concern that some industries require constant attention. Businesses such as healthcare or customer service cannot simply close for an extra day. In those cases, companies could introduce rotating schedules to maintain coverage.\n\nOverall, I believe the success of a four-day workweek depends on thoughtful planning and the specific needs of each industry.",
      },
    },
  },
  {
    testNumber: 3,
    title: "Chemistry Lab Safety & Student Leadership",
    listenRepeat: {
      scenario: "You are learning to give a safety introduction to students in the chemistry laboratory. Listen to the speaker and repeat what she says. Repeat only once.",
      sentences: [
        { id: 1, text: "This is our chemistry laboratory." },
        { id: 2, text: "Safety goggles are required at all times." },
        { id: 3, text: "Lab coats and gloves are available near the entrance." },
        { id: 4, text: "Please review the safety manual before starting any experiments." },
        { id: 5, text: "Do not handle chemicals without proper supervision." },
        { id: 6, text: "Waste materials must be disposed of in designated containers." },
        { id: 7, text: "If an emergency occurs, follow the evacuation signs to the nearest exit." },
      ],
    },
    interview: {
      scenario: "You are applying to join a student leadership program at your university. The interviewer will ask you some questions.",
      questions: [
        {
          id: 1,
          question: "Have you ever participated in a club, organization, or volunteer activity before? If so, what was your role?",
          sampleAnswer: "Last year, I joined the university's Environmental Club, which focuses on promoting sustainability and raising awareness about environmental issues. I volunteered as the events coordinator, where I was responsible for planning and organizing workshops and campus events. I worked closely with a team of five volunteers, coordinating tasks and making sure everyone knew their roles. I also reached out to guest speakers and managed social media promotion to attract participants. As a result, we successfully launched a campus-wide recycling program. This experience taught me how to communicate effectively and manage projects — skills I hope to develop even further in this leadership program.",
        },
        {
          id: 2,
          question: "What do you think is more important for a leader: listening carefully or giving clear instructions, and why?",
          sampleAnswer: "I believe listening carefully is the most important skill for a leader because it allows you to truly understand your team's ideas, concerns, and needs. If a leader listens first, they can make better decisions and guide the team more effectively. For example, in a group project last semester, one teammate was struggling with their assigned task. By taking the time to listen to their concerns, I realized they needed different support and adjusted responsibilities. This not only helped the team perform better but also made everyone feel valued. While giving clear instructions is important, I think instructions only work when you first understand the team, and listening is the key to achieving that.",
        },
        {
          id: 3,
          question: "Some people say leadership programs are essential for careers. Others believe students should just focus on academic courses. What is your opinion?",
          sampleAnswer: "I strongly believe that leadership programs are essential, and they should complement academic courses rather than replace them. Academic knowledge is important, but it often focuses on theory and individual skills. Leadership programs, on the other hand, help students develop real-world skills like teamwork, communication, problem-solving, and time management, which are crucial in almost any career. For instance, I participated in a student council program where I helped organize events and resolve conflicts within the team. Those experiences taught me practical skills that I later applied in internships and group projects. By combining both academics and leadership programs, students can become better prepared for future challenges.",
        },
        {
          id: 4,
          question: "What do you think universities could do to better prepare students for leadership roles in society?",
          sampleAnswer: "I think universities can do much more to prepare students for leadership roles by creating practical opportunities to develop leadership skills. For example, mentorship programs can pair students with experienced leaders who provide guidance and advice. Universities can also encourage student-led projects, workshops on communication and team management, and even cross-department collaborations to expose students to diverse ideas. These experiences allow students to practice leading in real situations, learning how to motivate others and solve problems effectively. When students graduate with both knowledge in their field and leadership experience, they are more confident and ready to take initiative in society and succeed in their careers.",
        },
      ],
    },
    writing: {
      buildSentence: [
        { id: 1, prompt: "The library closes early on Fridays.", scrambled: "its/on/what/hours / Saturday / opening/about", answer: "What about its opening hours on Saturdays?" },
        { id: 2, prompt: "I can't wait for the weekend.", scrambled: "planning/been / want/have / you / something", answer: "Have you been planning something?" },
        { id: 3, prompt: "I need to call the dentist today.", scrambled: "to/need/appointment/you/where/do/an/make", answer: "Do you need to make an appointment?" },
        { id: 4, prompt: "The enrollment for the AI course just opened.", scrambled: "it would / you / a good/join/to/do/think/ be / idea", answer: "Do you think it would be a good idea to join?" },
        { id: 5, prompt: "I'm reading an interesting article on cognitive bias right now.", scrambled: "share/me/you/with/could / link", answer: "Could you share the link with me?" },
        { id: 6, prompt: "I'm so tired this morning.", scrambled: "late/stay/when / did / yesterday/up/you", answer: "Did you stay up late yesterday?" },
        { id: 7, prompt: "I saw Emily at the warehouse yesterday.", scrambled: "was/her/there/she/doing / what", answer: "What was she doing there?" },
        { id: 8, prompt: "We have to do the shopping this afternoon.", scrambled: "would / you / went / after 6:00 p.m. / it work/for/we/if", answer: "Would it work for you if we went after 6:00 pm?" },
        { id: 9, prompt: "I need to clean my room today.", scrambled: "an hour / to clean / at least / think / everything/ will need/1/you", answer: "I think you will need at least an hour to clean everything." },
        { id: 10, prompt: "I'm really hungry right now.", scrambled: "place/a/around / you/good/do/here / know", answer: "Do you know a good place around here?" },
      ],
      writeEmail: {
        situation: "Your professor has offered extra credit opportunities.",
        task: ["Ask for details about the extra credit.", "Explain why you are interested.", "Confirm how to submit the work."],
        to: "Professor Green",
        subject: "Extra Credit Opportunity",
        sampleAnswer: "Dear Professor Green,\n\nI hope you are doing well. I am writing to ask for more details about the extra credit opportunities you mentioned in class.\n\nI am very interested in this option because I want to deepen my understanding of the course material and improve my overall performance. I have found the topics we are studying especially engaging, and I would be happy to put in extra effort to learn more and strengthen my skills.\n\nCould you please let me know what the extra credit assignment involves and what the expectations are? I would also like to confirm how the work should be submitted and whether there is a specific deadline or format I should follow.\n\nThank you very much for offering this opportunity and for your time. I look forward to your guidance.\n\nSincerely,\nLily White",
      },
      academicDiscussion: {
        professorPrompt: "Some governments offer financial incentives for families to have more children because of aging populations. Supporters argue this helps balance society and ensures enough workers in the future. Critics say it puts pressure on families and doesn't address deeper social issues. Should governments encourage larger families?",
        student1: { name: "Maya", post: "I think governments should encourage larger families because declining birth rates threaten economies. Incentives like childcare support and housing benefits can make family life easier and ensure long-term stability." },
        student2: { name: "Stan", post: "I don't think encouraging larger families is the best solution. High costs, lack of support, and career pressures stop people from having children. Governments should improve working conditions and gender equality instead." },
        sampleAnswer: "I think governments should be careful about encouraging larger families because money incentives alone do not solve the main problems that stop people from having children. For example, long working hours, unstable jobs, and limited childcare make family life difficult and stressful for many parents.\n\nStan mentioned that better working conditions and gender equality are more important, and I understand why he believes this is a stronger solution. I agree with him, but I also think Maya's idea has some value because incentives can help when they are combined with real support. Overall, governments should create secure conditions first, and use incentives only as additional support.",
      },
    },
  },
  {
    testNumber: 4,
    title: "Library Orientation & Daily Health Habits",
    listenRepeat: {
      scenario: "You are learning how to give a library orientation tour. Listen to the speaker and repeat what he says. Repeat only once.",
      sentences: [
        { id: 1, text: "Welcome to the main library." },
        { id: 2, text: "The circulation desk is just past the entrance." },
        { id: 3, text: "Computers for research are located on the second floor." },
        { id: 4, text: "Please keep your voice low in the study areas." },
        { id: 5, text: "Food and drinks are only allowed in the café downstairs." },
        { id: 6, text: "If you need help, librarians are available at the reference desk." },
        { id: 7, text: "Don't forget you can access thousands of e-books through our online system." },
      ],
    },
    interview: {
      scenario: "You are taking part in a research study about daily health habits. You will have a short online interview with a researcher.",
      questions: [
        {
          id: 1,
          question: "Do you usually exercise, and if so, what kind of exercise do you do?",
          sampleAnswer: "Yes, I usually exercise about four times a week. I enjoy a mix of activities depending on my schedule. I often go jogging in the mornings, which helps me feel energized for the day. I also do bodyweight workouts and some yoga at home to improve strength and flexibility. On weekends, I sometimes play basketball with friends, which is both fun and social. Exercising regularly has really helped me manage stress, maintain focus, and sleep better at night. I like keeping a balance between cardio, strength, and flexibility because it keeps my routine interesting and sustainable.",
        },
        {
          id: 2,
          question: "Is it easier to build healthy habits when living at home or when living on campus, and why?",
          sampleAnswer: "In my opinion, it's generally easier to build healthy habits while living at home. At home, routines tend to be more structured, meals are prepared, and there are fewer distractions, which makes it easier to exercise and get enough sleep. On campus, it's tempting to stay up late studying, attending social events, or eating fast food, which can disrupt healthy routines. That said, campus life can also encourage activity if you take advantage of gyms, sports clubs, or walking between classes. Overall, having a supportive environment with fewer distractions and consistent routines makes healthy habits easier to maintain.",
        },
        {
          id: 3,
          question: "Some people believe universities should require all students to take physical education or wellness classes. Do you agree or disagree?",
          sampleAnswer: "I agree that universities should require physical education or wellness classes for all students. Many students focus so much on academics that they neglect their physical and mental health, which can affect both performance and well-being. Mandatory classes can teach students how to exercise safely, manage stress, and maintain a balanced lifestyle. For example, students who learn basic nutrition and stress management strategies in these classes may adopt healthier habits long-term. Requiring these classes also creates a culture where wellness is valued and supported. While students should have some freedom of choice, structured wellness programs can help build lifelong healthy habits.",
        },
        {
          id: 4,
          question: "What do you think governments could do to encourage people to adopt healthier lifestyles?",
          sampleAnswer: "Governments could encourage healthier lifestyles by making healthy choices easier and more appealing. For example, they could improve public spaces with more parks, walking paths, and bike lanes, which promote physical activity. Subsidizing fruits and vegetables or taxing sugary drinks could make healthier diets more affordable and accessible. Public campaigns that raise awareness about the benefits of exercise, good sleep, and mental well-being can also motivate people. Schools and workplaces could be supported with wellness programs and incentives to stay active. By combining education, accessible infrastructure, and financial incentives, governments can create an environment where healthy choices feel natural and achievable for everyone.",
        },
      ],
    },
    writing: {
      buildSentence: [
        { id: 1, prompt: "Why haven't you finished the report?", scrambled: "missing/data/still/is/some / you", answer: "Some data is still missing." },
        { id: 2, prompt: "A few important tasks were not completed on time.", scrambled: "this/is/for/ delay / responsible / who/does / of", answer: "Who is responsible for this delay?" },
        { id: 3, prompt: "I invited Anna to visit us.", scrambled: "she / would/she/come/ say / when", answer: "When did she say she would come?" },
        { id: 4, prompt: "Should we follow up on this request?", scrambled: "response/if/ a good idea /that/no/received / been / has / is", answer: "That is a good idea if no response has been received." },
        { id: 5, prompt: "Why is this product cheaper?", scrambled: "was released / features than / has/ the / last year / it /that/one/fewer", answer: "It has fewer features than the one that was released last year." },
        { id: 6, prompt: "The professor is offering a new course next semester.", scrambled: "explain / requires / the/what/course/next/skills / you / could", answer: "Could you explain what skills the course requires?" },
        { id: 7, prompt: "Does Helen already know her results?", scrambled: "excellent / received / assignment/feedback/she/submitted / that / the", answer: "Yes, the assignment that she submitted received excellent feedback." },
        { id: 8, prompt: "What was he told to do?", scrambled: "reduce / intake/that/his/suggested/doctor/he/sugar / the", answer: "The doctor suggested that he reduce his sugar intake." },
        { id: 9, prompt: "Why do you look so upset?", scrambled: "already / bought/laptop/1/that/malfunctioning/is/ last year / the", answer: "The laptop that I bought last year is already malfunctioning." },
        { id: 10, prompt: "How did he react when you showed him the findings?", scrambled: "trusted/ wondered / results / be/ could / the/he/whether", answer: "He wondered whether the results could be trusted." },
      ],
      writeEmail: {
        situation: "You borrowed a textbook from your classmate, Mia, but accidentally spilled coffee on it while you were having lunch at the cafeteria.",
        task: ["Explain what happened.", "Offer to replace or repair the book.", "Apologize for the inconvenience."],
        to: "Mia",
        subject: "Apology about the textbook",
        sampleAnswer: "Hi Mia,\n\nI hope you are doing well. I am really sorry to tell you that I spilled coffee on the textbook you lent me while I was having lunch at the cafeteria today. It was an accident, but I still feel very bad because I should have been more careful with your book.\n\nI sincerely apologize for any inconvenience this may cause you. I will gladly replace the textbook with a new copy or cover the cost of any repairs, depending on what you prefer. Please let me know which option works best for you.\n\nThank you for your understanding, and I am truly sorry again.\n\nBest regards,\nLily White",
      },
      academicDiscussion: {
        professorPrompt: "Our topic today is personal identity. Some philosophers argue that identity is stable and continuous over time, meaning that a person remains essentially the same despite changes in circumstances. Others claim that identity constantly evolves due to experiences, relationships, culture, and social influences. Considering these perspectives, would you say identity is fixed or flexible?",
        student1: { name: "Taylor", post: "I believe identity is flexible because people gradually change their beliefs, values, and behaviors as they gain new experiences and interact with different environments. Over time, relationships, education, and challenges reshape how individuals see themselves." },
        student2: { name: "Jean", post: "I think there is a stable core personality that remains consistent despite external changes and new experiences. Although people may adapt their behavior to different situations, their fundamental traits and basic character tend to stay the same." },
        sampleAnswer: "I believe personal identity is largely flexible, although it may include some stable elements. As Taylor suggests, people gradually change their beliefs, values, and behaviors as they gain new experiences and encounter different environments. Education, relationships, and significant life challenges often reshape how individuals perceive themselves. For instance, someone who once considered themselves indecisive may become confident after assuming leadership roles or successfully overcoming adversity.\n\nAt the same time, I understand Jean's point that certain core traits remain relatively consistent. Qualities like introversion or optimism may persist across situations. However, even these traits can be expressed differently depending on social and cultural contexts. Therefore, identity is not fixed but continuously evolving through reflection and experience.",
      },
    },
  },
  {
    testNumber: 5,
    title: "Student Health Center & Campus Bookstore Job",
    listenRepeat: {
      scenario: "You are training to give directions to the student health center. Listen to the speaker and repeat what she says. Repeat only once.",
      sentences: [
        { id: 1, text: "The student health center is open every weekday from nine to five." },
        { id: 2, text: "Walk straight down this road for two blocks until you reach the intersection." },
        { id: 3, text: "Turn left at the large science building, which has a glass entrance." },
        { id: 4, text: "You'll see the student health center on your right, just across from the gym." },
        { id: 5, text: "Doctors and nurses are available for checkups and minor treatments." },
        { id: 6, text: "Counseling services are also offered for free, providing support for stress or anxiety." },
        { id: 7, text: "In case of medical emergencies, dial campus security immediately, and they'll send help." },
      ],
    },
    interview: {
      scenario: "You are applying for a part-time job at a campus bookstore. You will have a short online interview with the manager.",
      questions: [
        {
          id: 1,
          question: "Have you ever worked in customer service before? If so, what did you do?",
          sampleAnswer: "Yes, I have some customer service experience. Last summer, I worked at a small local café where I took orders, managed payments, and helped customers with questions about menu items. I also helped restock supplies and keep the space organized, which required attention to detail. I enjoyed interacting with customers, listening to their needs, and making sure they left satisfied. That experience taught me how to stay calm under pressure, communicate clearly, and manage multiple tasks at once. I believe these skills would help me succeed in a busy bookstore environment and provide customers with a friendly, helpful experience.",
        },
        {
          id: 2,
          question: "The store is very busy. Do you think it's more important to work quickly or to make sure every customer feels personally cared for, and why?",
          sampleAnswer: "I think it's important to balance speed with personal attention, but I would prioritize making customers feel cared for. When a store is busy, it's easy to rush, but customers remember feeling valued more than being served quickly. For example, even a small gesture like greeting someone warmly or answering a question clearly can make a big difference. That said, I would still work efficiently by organizing tasks and keeping the checkout process smooth. By combining attentiveness with smart time management, I can ensure customers leave satisfied while keeping the store running effectively.",
        },
        {
          id: 3,
          question: "Some people believe part-time jobs can help students build important skills. Others think they distract from academic responsibilities. What is your opinion?",
          sampleAnswer: "I believe part-time jobs can be very helpful if students manage their time well. Working teaches responsibility, communication, teamwork, and problem-solving skills that are useful both during college and after graduation. For example, in my previous job at a café, I learned to handle difficult situations calmly and organize tasks efficiently, which improved my confidence and time management. While it's true that jobs can be distracting if not planned carefully, I think the benefits outweigh the risks. A part-time job can complement academic learning by giving practical experience and preparing students for professional life.",
        },
        {
          id: 4,
          question: "How do you think working during college might influence your career opportunities after graduation?",
          sampleAnswer: "Working during college can have a positive impact on career opportunities because it provides practical experience and develops transferable skills. For instance, jobs in customer service teach communication, problem-solving, and teamwork, all of which are highly valued by employers. It also shows future employers that a student is responsible, reliable, and capable of managing multiple responsibilities. Personally, I believe that even a part-time role can help me build confidence, learn professional etiquette, and create connections that may benefit my career later. Overall, college jobs prepare students not only with skills but also with a stronger work ethic and a better understanding of professional environments.",
        },
      ],
    },
    writing: {
      buildSentence: [
        { id: 1, prompt: "I'm thinking about applying for a scholarship next semester.", scrambled: "are/what/you/know/requirements / the/do", answer: "Do you know what the requirements are?" },
        { id: 2, prompt: "I need to improve my writing skills for the upcoming exam.", scrambled: "resources/any/to/you/recommend/me/like/would", answer: "Would you like me to recommend any resources?" },
        { id: 3, prompt: "I couldn't attend the webinar because my internet stopped working.", scrambled: "if / available / the recording/check/me/ is / let", answer: "Let me check if the recording is available." },
        { id: 4, prompt: "The apartment that we wanted to rent was taken by someone else.", scrambled: "check / available / if / are / did/ still / other options / there / you", answer: "Did you check if there are still other options available?" },
        { id: 5, prompt: "The scientist who led the study presented the results at the conference.", scrambled: "show/where/ can/find/we/the/full/ report", answer: "Where can we find the full published report?" },
        { id: 6, prompt: "The stocks grew by 5% yesterday.", scrambled: "we/or/now/whether/invest / we should/to/wait/ decide / need", answer: "We need to decide whether we should invest now or wait." },
        { id: 7, prompt: "The book that you recommended turned out to be extremely insightful.", scrambled: "helpful/you/which/most/part/ the book/did/ of /find", answer: "Which part of the book did you find most helpful?" },
        { id: 8, prompt: "The committee finally approved the proposal.", scrambled: "were/you/summarize/points/that/discussed / the main / during the meeting", answer: "Please summarize the main points that were discussed during the meeting." },
        { id: 9, prompt: "The report was finally published.", scrambled: "the/highlight/findings / you / are / most/which/significant / could", answer: "Could you highlight which findings are the most significant?" },
        { id: 10, prompt: "What did the experts say?", scrambled: "for/a/experiment / different/strategy / recommended / the / they / trying", answer: "They recommended trying a different strategy for the experiment." },
      ],
      writeEmail: {
        situation: "You are interested in enrolling in a course next semester, but the course description on the university website is unclear and does not provide enough details about requirements and workload.",
        task: ["Explain why you are interested in the course.", "Ask specific questions about requirements and expectations.", "Request additional information to help you decide."],
        to: "Academic Advisor",
        subject: "Request for course information",
        sampleAnswer: "Dear Academic Advisor,\n\nI hope you are doing well. I am interested in enrolling in one of the courses offered next semester because it closely aligns with my academic goals and would help me strengthen my knowledge in this field. However, I found the course description on the university website somewhat unclear.\n\nCould you please provide more details about the course requirements, such as prerequisites, assessment methods, and weekly workload? I would also like to know how much independent study is expected and whether there are any major projects or exams.\n\nAny additional information or guidance would be greatly appreciated, as it will help me make an informed decision.\n\nThank you for your time and assistance.\n\nBest regards,\nLily White",
      },
      academicDiscussion: {
        professorPrompt: "Psychologists continue to debate whether intelligence is largely determined by genetic factors or whether it can significantly improve through sustained effort, effective education, and enriched environments. In your view, is intelligence mostly fixed at birth, or can it meaningfully develop over time?",
        student1: { name: "Mina", post: "I think intelligence can improve with consistent effort because practice, challenging tasks, and quality education gradually strengthen cognitive skills. When individuals actively engage in learning and problem-solving, they can expand their abilities beyond what they initially believed possible." },
        student2: { name: "Carlos", post: "I believe genetics set relatively clear limits on intelligence, even if effort and education can help to some extent. While practice may refine certain skills, a person's overall intellectual capacity is largely influenced by inherited biological factors." },
        sampleAnswer: "I believe intelligence can meaningfully develop over time, although genetics may set an initial range. I agree with Mina that consistent effort, challenging tasks, and high-quality education can gradually strengthen cognitive skills. For example, when individuals regularly practice problem-solving or learn new concepts, they build neural connections that support better reasoning and memory.\n\nAt the same time, Carlos makes a valid point that biological factors may influence one's starting point. However, I think these limits are not as fixed as they seem. Many people exceed expectations through persistence and effective learning strategies.\n\nIn my view, intelligence is not purely fixed or flexible, but a combination of both. With the right environment and sustained effort, individuals can significantly improve their abilities over time.",
      },
    },
  },
  {
    testNumber: 6,
    title: "Dormitory Rules & Community Volunteering",
    listenRepeat: {
      scenario: "You are learning how to welcome new students and explain the basic rules of the residence hall. Listen to the speaker and repeat what he says. Repeat only once.",
      sentences: [
        { id: 1, text: "Welcome to your new dormitory." },
        { id: 2, text: "Quiet hours begin at ten o'clock each night." },
        { id: 3, text: "Please lock your door whenever you leave the room." },
        { id: 4, text: "Cooking is allowed only in the common kitchen area." },
        { id: 5, text: "Guests must sign in at the front desk before entering." },
        { id: 6, text: "Keep hallways clear and avoid leaving personal belongings outside." },
        { id: 7, text: "Respect your roommates and neighbors, as this helps everyone enjoy a safe and pleasant living environment." },
      ],
    },
    interview: {
      scenario: "You are applying for a volunteer program at a community center. You will have a short online interview.",
      questions: [
        {
          id: 1,
          question: "Have you ever done volunteer work before? If so, what did you do?",
          sampleAnswer: "Yes, I have volunteered at a local food bank for the past year. My role involved organizing donated items, preparing food packages, and helping distribute them to families in need. I also assisted in coordinating small fundraising events to support the food bank. Through this experience, I learned to work efficiently in a team and communicate kindly with people from different backgrounds. One of my proudest moments was helping organize a special holiday food drive that reached over 100 families. Volunteering taught me the importance of empathy, patience, and community involvement, and it motivated me to continue contributing to meaningful causes.",
        },
        {
          id: 2,
          question: "Which quality do you think is more important for a volunteer: patience or flexibility? Why?",
          sampleAnswer: "I believe patience is the most important quality for a volunteer. Volunteers often work with people who face challenges, and situations don't always go as planned. For example, when I helped at a community tutoring program, some students struggled to understand lessons, and I needed to stay patient while explaining concepts multiple times. Patience allowed me to provide support without frustration and build trust with the students. Flexibility is also important, but without patience, adapting to changing circumstances becomes difficult. Being patient ensures that volunteers can respond calmly, encourage others effectively, and maintain a positive and helpful environment.",
        },
        {
          id: 3,
          question: "Some people believe all university students should be required to do community service. Others believe it should always be voluntary. What is your opinion?",
          sampleAnswer: "I believe community service should remain voluntary. While it teaches valuable skills and benefits the community, requiring it could make students feel pressured and less genuinely engaged. For example, I chose to volunteer at a local food bank because I genuinely wanted to help. This motivation made me more committed and willing to learn, and I gained more meaningful experience than if it had been mandatory. Voluntary service encourages personal responsibility, empathy, and intrinsic motivation. Students who choose to volunteer are more likely to contribute positively and enjoy the experience, which ultimately benefits both the community and the volunteer much more than a required program would.",
        },
        {
          id: 4,
          question: "How do you think volunteer work benefits not only the community but also the volunteers themselves?",
          sampleAnswer: "Volunteer work benefits the community by providing support, resources, and companionship to those in need, but it also benefits the volunteers personally. For instance, while helping at a local animal shelter, I developed time management, teamwork, and communication skills. I also gained a better understanding of social and community issues, which increased my empathy and awareness. Volunteers often feel a sense of fulfillment and confidence from making a difference, and these experiences can strengthen problem-solving abilities and leadership skills. In short, volunteering creates a positive cycle: the community receives help, and volunteers grow personally, socially, and professionally, making it a mutually rewarding experience.",
        },
      ],
    },
    writing: {
      buildSentence: [
        { id: 1, prompt: "Her presentation was impressive and extremely well-structured.", scrambled: "very/prepared / clearly / she / was", answer: "Clearly, she was very prepared." },
        { id: 2, prompt: "The meeting ended much later than scheduled.", scrambled: "expect/didn't/to/so/1/last/it/long", answer: "I didn't expect it to last so long." },
        { id: 3, prompt: "The company plans to introduce a new policy next quarter.", scrambled: "affected/be/will/ employees / how", answer: "How will employees be affected?" },
        { id: 4, prompt: "I'm not sure if I understood the requirements for this assignment correctly.", scrambled: "you/suggest/ this issue / your instructor/about/speak/1/with", answer: "I suggest you speak with your instructor about this issue." },
        { id: 5, prompt: "The software update includes several new security features.", scrambled: "protecting/users/these/ protect / features / help / explain / how", answer: "Please explain how these features help protect users." },
        { id: 6, prompt: "We need to finish the group project before the deadline.", scrambled: "tasks/how/to/ divide / decide / should / the / we", answer: "We should decide how to divide the tasks." },
        { id: 7, prompt: "Where will we meet to work on our group project today?", scrambled: "today/ café / early / closes / the / usually/where/we/ study", answer: "The café where we usually study closes early today." },
        { id: 8, prompt: "Why is it taking so long?", scrambled: "whether / discussing / effective / will / they / the new policy / are / be", answer: "They are discussing whether the new policy will be effective." },
        { id: 9, prompt: "A new documentary about global education systems was released last month.", scrambled: "available / streaming platforms/any/is/on/if/it/know/ you/ do", answer: "Do you know if it is available on any streaming platforms?" },
        { id: 10, prompt: "Do you know anyone here?", scrambled: "is/very/famous engineer /a/woman/wearing/ the/ a blue dress", answer: "The woman wearing a blue dress is a very famous engineer." },
      ],
      writeEmail: {
        situation: "Your campus café increased its prices. Many students are now discussing the higher prices and expressing concerns about affordability.",
        task: ["Describe the problem.", "Share student opinions.", "Suggest possible solutions."],
        to: "Student Council",
        subject: "Concern about price increase",
        sampleAnswer: "Dear Student Council Members,\n\nI am writing to share concerns about the recent price increase at the campus café. Because it is a convenient place for students to buy meals between classes, many students feel the higher prices are no longer affordable. Some students say they may skip meals or leave campus to find cheaper food, which is difficult during short breaks.\n\nStudents have suggested possible solutions, such as offering student discounts, adding lower-cost meal options, or providing daily specials at reduced prices. These steps could make food more accessible while supporting the café's operation.\n\nThank you for your attention to this matter.\n\nSincerely,\nLily White",
      },
      academicDiscussion: {
        professorPrompt: "Philosophers have long debated the primary purpose of education. Some argue that education should mainly prepare individuals for the workforce and economic productivity, while others believe its central goal is to cultivate critical thinking, ethical awareness, and personal development. Which purpose of education do you consider more important?",
        student1: { name: "Aisha", post: "Education should prioritize critical thinking because this skill is valuable in every aspect of life. Individuals who think critically can solve problems, evaluate information carefully, and adapt successfully to changing circumstances." },
        student2: { name: "David", post: "I believe preparing students for employment is more important since financial stability strongly influences quality of life. Education that develops practical skills helps individuals secure jobs, achieve independence, and contribute productively to society." },
        sampleAnswer: "I agree with Aisha's view that education should prioritize critical thinking. One important reason is that this skill helps individuals analyze information carefully, which can prevent them from making poor decisions based on misinformation. Moreover, critical thinking encourages adaptability, making people better prepared to face unexpected challenges in both personal and professional life.\n\nWhile David suggests that preparing students for employment is more important, this perspective may be less convincing because job-specific skills can become outdated quickly. For example, technical abilities learned in school may no longer be useful as industries change.\n\nUltimately, although employment preparation is valuable, developing strong critical thinking skills provides a foundation that supports lifelong learning, responsible decision-making, and success in many different situations.",
      },
    },
  },
  {
    testNumber: 7,
    title: "Biology Lecture Hall & Movies",
    listenRepeat: {
      scenario: "You are learning how to give instructions in a biology lecture hall. Listen to the speaker and repeat what she says. Repeat only once.",
      sentences: [
        { id: 1, text: "Welcome to the biology lecture hall." },
        { id: 2, text: "Please silence your phones before class begins." },
        { id: 3, text: "All lecture slides will be posted after each session." },
        { id: 4, text: "If you have questions, you may ask them during designated times." },
        { id: 5, text: "Attendance is recorded automatically through your student ID scan." },
        { id: 6, text: "Please avoid blocking the aisles to ensure safe movement in the hall." },
        { id: 7, text: "This course introduces key biological concepts that will prepare you for advanced science classes." },
      ],
    },
    interview: {
      scenario: "You agreed to take part in a short interview about movies. The interviewer will ask you some questions.",
      questions: [
        {
          id: 1,
          question: "How often do you go to the cinema?",
          sampleAnswer: "I go to the cinema about once or twice a month. I don't go very frequently because I prefer to choose movies that really benefit from a large screen and good sound quality. For example, when a highly anticipated film or a visually impressive movie is released, I usually plan a cinema visit and sometimes go with friends. At the same time, I have a busy schedule, so going too often is not always practical. In those cases, I watch movies at home instead. Overall, I see going to the cinema as a special activity rather than a regular habit. This makes each visit more enjoyable and helps me appreciate the experience more when I do go.",
        },
        {
          id: 2,
          question: "Could you describe a movie you have watched recently?",
          sampleAnswer: "Recently, I watched a historical drama called Oppenheimer. I decided to watch it because I am interested in history and wanted to learn more about the scientific and ethical issues behind the story. The movie focuses on the life of the scientist who played a central role in developing the atomic bomb. What impressed me most was how the film showed his internal conflict and sense of responsibility, rather than only presenting historical events. The acting was very strong, and the music helped create a serious and intense atmosphere. Although the movie was quite long, it kept my attention throughout. In the end, it made me think more deeply about how scientific discoveries can have long-lasting consequences for society.",
        },
        {
          id: 3,
          question: "Which do you prefer: watching movies at the cinema or at home? Why?",
          sampleAnswer: "I prefer watching movies at home because it is more comfortable and flexible. At home, I can choose when to watch a movie and adjust the experience to my needs. For example, I can pause the movie to take a break, replay a scene, or watch it over several evenings if I don't have much time. Another reason is cost, since watching movies at home is usually more affordable than going to the cinema regularly. That said, I still enjoy going to the cinema for special releases, especially movies with impressive visuals or sound effects. However, for everyday viewing, comfort, convenience, and control over my time make watching movies at home my preferred option.",
        },
        {
          id: 4,
          question: "Do you think watching movies at the cinema will continue to be popular in the future? Why or why not?",
          sampleAnswer: "I believe watching movies at the cinema will continue to be popular in the future, although the way people use cinemas may change. Streaming services are very convenient and allow people to watch movies at home easily. However, cinemas offer an experience that cannot be fully replaced, especially for big-budget movies designed for large screens and surround sound. For instance, action or science-fiction films are often more exciting in a theater. In addition, going to the cinema is a social activity, giving people an opportunity to spend time together outside the home. For these reasons, I think cinemas will remain relevant by focusing on high-quality and immersive experiences, even if people go less frequently than before.",
        },
      ],
    },
    writing: {
      buildSentence: [
        { id: 1, prompt: "I don't know what brushes to buy for our art project.", scrambled: "buy/will/you/whichever/work", answer: "Whichever you buy will work." },
        { id: 2, prompt: "What are we waiting for?", scrambled: "start / everyone / joins/can't / unless/meeting/ we the", answer: "We can't start the meeting unless everyone joins." },
        { id: 3, prompt: "Is going to sleep on time that important?", scrambled: "sleep/improves/getting/enough/concentration", answer: "Getting enough sleep improves concentration." },
        { id: 4, prompt: "The deadlines are too short.", scrambled: "under/anxiety / can/increase/working/time/ pressure", answer: "Working under time pressure can increase anxiety." },
        { id: 5, prompt: "What were you talking about with Lucy?", scrambled: "whether/additional/asked/materials/she/we/needed", answer: "She asked whether we needed additional materials." },
        { id: 6, prompt: "The professor explained the concept again during the lecture today.", scrambled: "for clarification / and asked / because / didn't/ fully understand / that's/1/it", answer: "That's because I didn't fully understand it and asked for clarification." },
        { id: 7, prompt: "Is the meeting already over?", scrambled: "continuing/short break / before/taking/suggested/ the/a/ speaker", answer: "The speaker suggested taking a short break before continuing." },
        { id: 8, prompt: "It looks like it is going to rain.", scrambled: "be/improves / outdoor event / the weather / unless / will / canceled / the", answer: "Unless the weather improves, the outdoor event will be canceled." },
        { id: 9, prompt: "What materials did you use to prepare for the test?", scrambled: "the/recommended/were/ the resources / very helpful / professor/ by", answer: "The resources recommended by the professor were very helpful." },
        { id: 10, prompt: "I'll take the exam tomorrow.", scrambled: "before/review/ you / the test / your notes/that/recommend / I", answer: "I recommend that you review your notes before the test." },
      ],
      writeEmail: {
        situation: "You recently started an internship, but you discovered that the assigned working hours conflict with one of your required university classes.",
        task: ["Explain the scheduling conflict.", "Describe why both the internship and the class are important to you.", "Request a possible adjustment to your schedule."],
        to: "Internship Supervisor",
        subject: "Request for schedule adjustment",
        sampleAnswer: "Dear Internship Supervisor,\n\nI am writing to see if I could make a small change to my work schedule. I recently found out that my assigned internship hours conflict with a required university class.\n\nThis class is mandatory for me to graduate this semester, so I cannot miss it. At the same time, this internship is also extremely important because it allows me to gain practical experience in software development and prepare for my future career.\n\nCould I possibly shift my Tuesday hours to Thursday afternoon instead? This adjustment would allow me to attend my class while continuing to complete all of my internship responsibilities.\n\nThank you for your understanding.\n\nBest regards,\nLily White",
      },
      academicDiscussion: {
        professorPrompt: "Music is often described as a universal language. It can bring people together across cultures and generations. However, some argue that music styles are so different that they don't always connect people. Do you think music truly unites people, or are cultural differences too strong?",
        student1: { name: "Carolina", post: "I think music unites people because emotions are universal. Even without understanding the words, people can feel the rhythm, and events like concerts show how music brings different backgrounds together." },
        student2: { name: "David", post: "I believe music does not always unite people because cultural and generational differences affect how it is perceived. Some styles may feel unfamiliar, so music can also highlight differences." },
        sampleAnswer: "I agree with Carolina's view that music truly unites people despite their backgrounds. One important reason is that melodies convey raw emotions, which can instantly connect individuals without any language barriers. Moreover, shared musical experiences foster a strong sense of community, making cultural differences feel entirely irrelevant.\n\nWhile David suggests that unfamiliar musical styles might highlight generational or cultural divides, this perspective may be less convincing because exposure naturally breeds appreciation. For example, the global rise of K-pop shows that millions of listeners actively embrace unfamiliar languages and foreign beats.\n\nUltimately, although distinct musical traditions undeniably exist, the universal emotional impact of a good melody ensures that music brings us together rather than driving us apart.",
      },
    },
  },
  {
    testNumber: 8,
    title: "Campus Bookstore & Travel Preferences",
    listenRepeat: {
      scenario: "You are learning how to guide new students through the campus bookstore. Listen to the speaker and repeat what he says. Repeat only once.",
      sentences: [
        { id: 1, text: "Welcome to the campus bookstore." },
        { id: 2, text: "School supplies are displayed near the front checkout counter." },
        { id: 3, text: "University merchandise is located in the back section." },
        { id: 4, text: "Required textbooks are organized by course number for easy searching." },
        { id: 5, text: "Students can order unavailable textbooks online through the bookstore website." },
        { id: 6, text: "Staff members are available to assist students in locating required materials." },
        { id: 7, text: "Receipts must be presented for all returns or exchanges within the bookstore policy period." },
      ],
    },
    interview: {
      scenario: "You have agreed to take part in a research study about travel preferences. The researcher will ask you some questions.",
      questions: [
        {
          id: 1,
          question: "How often do you travel, and what kinds of places do you usually like to visit?",
          sampleAnswer: "I usually travel once or twice a year, depending on my work schedule and budget. When I travel, I prefer places that offer both relaxation and cultural experiences. For example, I enjoy visiting beaches where I can relax, but I also like exploring local markets, trying traditional food, and learning about the history of the place. In addition, I prefer destinations that are not too crowded because they feel more peaceful and less stressful. I also enjoy taking photos and trying new activities like hiking or island hopping. Overall, I believe a good trip should be a balance between rest and exploration, so I can return feeling refreshed while also gaining meaningful experiences.",
        },
        {
          id: 2,
          question: "Many people say traveling helps them learn about different cultures. What do you think people gain from traveling?",
          sampleAnswer: "I believe people gain many valuable things from traveling. First of all, it helps them understand different cultures and lifestyles, which can make them more open-minded and respectful. For instance, seeing how people live in other countries can change your perspective and help you appreciate what you have. In addition, traveling improves communication skills, especially when interacting with people from different backgrounds. It also builds confidence because travelers often need to solve problems on their own, such as finding directions or managing unexpected situations. Overall, traveling is not just about relaxation, but also about personal growth, learning, and becoming more independent.",
        },
        {
          id: 3,
          question: "Some people prefer carefully planned trips, while others prefer spontaneous travel. Which do you prefer? Why?",
          sampleAnswer: "Personally, I prefer carefully planned trips rather than spontaneous travel. I like having an itinerary because it helps me manage my time efficiently and ensures that I don't miss important attractions. For example, I usually research the best places to visit, transportation options, and accommodations before my trip. However, I also think it is important to stay flexible. Sometimes unexpected opportunities come up, such as discovering a hidden spot or joining a local activity, and I want to enjoy those moments as well. In this way, I can have a structured plan while still experiencing a sense of adventure, making the trip both enjoyable and less stressful.",
        },
        {
          id: 4,
          question: "Some educators believe students should take a gap year and travel the world before committing to a specific career. Do you agree or disagree? Why?",
          sampleAnswer: "I agree that taking a gap year to travel can be very beneficial for students, especially before starting university. First of all, it allows them to gain real-world experience and become more independent. For example, they learn how to manage money, plan trips, and adapt to new environments. In addition, traveling exposes them to different cultures, which can broaden their perspective and help them grow as individuals. However, I think it depends on the person. Some students may lose focus or feel unmotivated to continue their studies afterward. Therefore, if the gap year is well-planned and has a clear purpose, it can be a very valuable and life-changing experience.",
        },
      ],
    },
    writing: {
      buildSentence: [
        { id: 1, prompt: "I'm thinking about joining a gym.", scrambled: "membership plans / which / know / offered / are being/do/you", answer: "Do you know which membership plans are being offered?" },
        { id: 2, prompt: "My phone battery keeps dying quickly.", scrambled: "using/have/ the charger/ that came / you tried / with the device", answer: "Have you tried using the charger that came with the device?" },
        { id: 3, prompt: "I'm considering taking online yoga classes.", scrambled: "benefits / practicing/hoping/what/to get / are you / from regularly?", answer: "What benefits are you hoping to get from practicing regularly?" },
        { id: 4, prompt: "I spilled coffee on my keyboard this morning.", scrambled: "checked by / a technician / yet/been/has/it/having", answer: "Has it been checked by a technician yet?" },
        { id: 5, prompt: "I'm planning to redecorate my apartment.", scrambled: "look/colors/bigger/the room / would make / which", answer: "Which colors would make the room look bigger?" },
        { id: 6, prompt: "My neighbor just adopted a puppy.", scrambled: "breed/know/do/what/stay/ is/it/you", answer: "Do you know what breed it is?" },
        { id: 7, prompt: "I've been having trouble sleeping lately.", scrambled: "fall/ faster / helps/asleep/what/you usually", answer: "What usually helps you fall asleep faster?" },
        { id: 8, prompt: "I need to renew my passport soon.", scrambled: "appointments / whether / know / are booked / far in advance / do/you", answer: "Do you know whether appointments are booked far in advance?" },
        { id: 9, prompt: "I'm trying to reduce my screen time.", scrambled: "checking/managing/are / your phone / to avoid / how/you", answer: "How are you managing to avoid checking your phone?" },
        { id: 10, prompt: "My package still hasn't arrived.", scrambled: "the company/contacted / shipped it / you / have / that", answer: "Have you contacted the company that shipped it?" },
      ],
      writeEmail: {
        situation: "You signed up for a weekend photography workshop offered by a community center. However, you received two emails with different starting times for the class, and you are unsure which one is correct.",
        task: ["Explain the conflicting information you received.", "Mention why confirming the schedule is important for you.", "Ask which starting time is correct and whether updated details will be sent."],
        to: "Workshop Coordinator",
        subject: "Question about start time",
        sampleAnswer: "Dear Workshop Coordinator,\n\nI am really looking forward to attending the upcoming weekend photography workshop at the community center. However, I recently received two separate registration emails that show conflicting starting times for the class, so I am quite unsure which one is correct.\n\nConfirming the exact schedule is very important to me because I need to arrange my family commitments and transportation in advance. Could you please clarify which starting time is actually the right one? Also, will an updated schedule with the final details be sent out to everyone?\n\nThank you very much for your help.\n\nBest regards,\nLily White",
      },
      academicDiscussion: {
        professorPrompt: "Competition is common in education through grades, rankings, and awards. Some educators argue that competition motivates students to work harder and improve performance. Others believe excessive competition increases stress and discourages collaboration. Does competition in education help students more than it harms them? Why?",
        student1: { name: "Robin", post: "I think competition helps students because it creates motivation and encourages effort. Many students perform better when they have clear goals and want to achieve strong results. Competition can also prepare people for real-world environments where performance matters. I believe moderate competition can be healthy." },
        student2: { name: "Jordan", post: "In my opinion, competition can harm students more than it helps. Too much pressure may increase anxiety and make students focus only on outperforming others. This can reduce collaboration and enjoyment of learning. I believe that education should emphasize growth rather than constant comparison." },
        sampleAnswer: "I agree with Robin's view that moderate classroom competition genuinely benefits students. One important reason is that aiming for top rankings encourages consistent daily effort, which can dramatically boost a student's final academic performance. Moreover, overcoming these educational challenges effectively prepares young people for highly competitive real-world career environments, making them far more resilient and capable adults.\n\nWhile Jordan suggests that classroom contests increase severe anxiety, this perspective may be less convincing because well-structured challenges emphasize personal development over negative comparison. For example, school spelling bees or science fairs typically inspire participants to master difficult concepts alongside supportive peers.\n\nUltimately, although excessive pressure can sometimes cause mental fatigue, balanced academic competition effectively drives essential self-improvement.",
      },
    },
  },
  {
    testNumber: 9,
    title: "Advising Center & Studying Habits",
    listenRepeat: {
      scenario: "You are learning how to guide new students through the advising center. Listen to the speaker and repeat what she says. Repeat only once.",
      sentences: [
        { id: 1, text: "Welcome to the advising center." },
        { id: 2, text: "Appointment check-in is completed at the reception desk." },
        { id: 3, text: "Academic advisors help students plan schedules and choose courses." },
        { id: 4, text: "Career development resources are available in the resource room." },
        { id: 5, text: "Workshops covering academic success strategies are offered regularly." },
        { id: 6, text: "Walk-in advising services are provided during limited hours for urgent concerns." },
        { id: 7, text: "Please arrive early for scheduled appointments to allow adequate preparation time." },
      ],
    },
    interview: {
      scenario: "You have agreed to take part in a research study about studying habits. The interviewer will ask you some questions.",
      questions: [
        {
          id: 1,
          question: "How many hours do you usually study each week, and where do you prefer to study?",
          sampleAnswer: "I typically dedicate about 15 to 20 hours a week to my studies outside of scheduled classes. This time is usually spread out across the week to ensure I stay consistent without burning out. As for where I prefer to study, the university library is my absolute favorite spot. It offers a unique atmosphere of quiet productivity that is hard to replicate at home. Being surrounded by other students who are also focused creates a subtle, positive pressure that keeps me from getting distracted. I find that having a dedicated environment for academic work creates a clear psychological boundary; once I step into that space, my brain automatically switches into a focused study mode that makes learning much more efficient.",
        },
        {
          id: 2,
          question: "What study methods work best for you and why?",
          sampleAnswer: "When it comes to learning effectively, I rely heavily on active recall. Rather than passively re-reading my textbooks or highlighting notes — which often gives a false sense of security — I force myself to explain concepts aloud or write them down from memory. This method highlights exactly where my understanding is weak, allowing me to target those areas immediately. Additionally, I use the Pomodoro Technique, where I study in focused 25-minute sprints followed by five-minute breaks. This approach is incredibly effective for me because it prevents mental fatigue and keeps my concentration levels high throughout long sessions. Breaking down daunting assignments into manageable chunks makes the entire process feel less overwhelming.",
        },
        {
          id: 3,
          question: "Some students prefer studying early in the morning, while others study in the evenings. Which do you think is more effective and why?",
          sampleAnswer: "Personally, I believe that the effectiveness of studying early in the morning versus in the evening is entirely dependent on an individual's internal biological clock. Some people are naturally energized in the morning, while others reach their cognitive peak later in the day. For me, evening study sessions are significantly more effective. I often find that my brain takes quite a while to fully warm up in the morning. However, once the day winds down and the common distractions decrease, I feel a greater sense of clarity and focus. This nocturnal rhythm allows me to engage in deep, analytical work without feeling rushed. Ultimately, the best strategy is understanding when you are most alert and organizing challenging tasks around that time.",
        },
        {
          id: 4,
          question: "Some universities encourage students to attend workshops about study skills. Do you think these programs are useful? Why or why not?",
          sampleAnswer: "I strongly believe that study skills workshops offered by universities are very helpful for students. When students start university, they often need new ways to organize their time and study effectively. Many of them struggle at first because they try to use the same habits they had in high school, and those habits usually don't work anymore. These workshops help students learn practical techniques, such as better note-taking, managing stress, and planning their time more efficiently. By attending these sessions, students can improve their academic performance because they learn how to study in a smarter way, not just spend more time studying. This makes learning feel more manageable and helps students develop a healthier approach to their studies.",
        },
      ],
    },
    writing: {
      buildSentence: [
        { id: 1, prompt: "I'm learning how to cook Thai food.", scrambled: "making first / interested in / dishes / which / you / are", answer: "Which dishes are you interested in making first?" },
        { id: 2, prompt: "The washing machine stopped working again.", scrambled: "do/repaired/know/can be /it/if/you", answer: "Do you know if it can be repaired?" },
        { id: 3, prompt: "I'm thinking of switching banks.", scrambled: "a new account / what features / looking for/are/in/you", answer: "What features are you looking for in a new account?" },
        { id: 4, prompt: "My friend invited me to a wedding next month.", scrambled: "be wearing/you'll / have / what/decided / he / you", answer: "Have you decided what you'll be wearing?" },
        { id: 5, prompt: "I've started listening to podcasts during walks.", scrambled: "people talk/topics/ enjoy hearing / do you/what/about", answer: "What topics do you enjoy hearing people talk about?" },
        { id: 6, prompt: "My friend moved to another country last month.", scrambled: "teaches people / become / living abroad / often / more independent/to", answer: "Living abroad often teaches people to become more independent." },
        { id: 7, prompt: "I can see you are still worried about missing the train tomorrow.", scrambled: "changed/can / whether/check/ the schedule / has been / you", answer: "Can you check whether the schedule has been changed?" },
        { id: 8, prompt: "The café near my office closed suddenly.", scrambled: "was/know/it/shut down/do/why/you/office", answer: "Do you know why it was shut down?" },
        { id: 9, prompt: "I'm planning to sell some old furniture.", scrambled: "where / easiest / you think / it /do/ to find buyers / would be", answer: "Where do you think it would be easiest to find buyers?" },
        { id: 10, prompt: "I haven't received a reply to my email yet.", scrambled: "been/ the message/not/may/yet/ have / seen /", answer: "The message may not have been seen yet." },
      ],
      writeEmail: {
        situation: "You borrowed equipment from your university's media center for a class project and returned the equipment on time. However, this morning, you received a notification that a late-return fee has been added to your account.",
        task: ["Describe the fee notification you received.", "Explain when and how you returned the equipment.", "Request a review of the charge and clarification of the records."],
        to: "mediacenter@greenhilluniversity.edu",
        subject: "Late Fee Question",
        sampleAnswer: "Dear Media Center Staff,\n\nI am writing because I received an automated notification this morning stating that a late fee was added to my account. However, I believe there has been a misunderstanding. I borrowed some video equipment for a class project and returned everything on time on Friday afternoon by handing it directly to the front desk clerk.\n\nCould you please review my charge and clarify your system's records? I would greatly appreciate it if you could look into this error and remove the fee.\n\nThank you very much for your time and help.\n\nBest regards,\nAlex Williams",
      },
      academicDiscussion: {
        professorPrompt: "Many famous tourist destinations are experiencing problems caused by large numbers of visitors. Overcrowding can damage historical sites, increase pollution, and make life more difficult for local residents. Should governments place restrictions on tourism in popular destinations?",
        student1: { name: "Deseree", post: "I support limiting tourism because excessive numbers of visitors can seriously damage local environments and historical sites. Residents may also face higher living costs and overcrowded public spaces. Protecting these places is important so future generations can continue enjoying them." },
        student2: { name: "Mark", post: "I disagree because tourism is an important source of income for many communities. Hotels, restaurants, and local businesses depend heavily on visitors. Restricting tourism could reduce employment opportunities and negatively affect the local economy." },
        sampleAnswer: "I agree with Deseree's view that governments should place strict limits on tourism in popular destinations. One important reason is that managing crowd sizes reduces structural wear on historical landmarks, which can preserve invaluable cultural heritage for future generations. Moreover, capping visitor numbers lowers the heavy pressure on public infrastructure, making daily life much more comfortable and affordable for local residents.\n\nWhile Mark suggests that restricting tourism could harm local economies by reducing job opportunities, this perspective may be less convincing because uncontrolled overcrowding eventually destroys the unique attractions that draw visitors in the first place. For example, several famous tropical beaches have faced complete closures due to severe pollution, leaving local businesses with zero customers.\n\nUltimately, although tourism provides vital short-term revenue, limiting visitor numbers is necessary to ensure long-term sustainability.",
      },
    },
  },
  {
    testNumber: 10,
    title: "Academic Integrity & Food Habits",
    listenRepeat: {
      scenario: "You are learning to explain academic integrity to students. Listen to your supervisor and repeat only once.",
      sentences: [
        { id: 1, text: "All written work must be original." },
        { id: 2, text: "Sources must be cited using the required format." },
        { id: 3, text: "Copying text without giving credit is considered plagiarism." },
        { id: 4, text: "Violations of academic integrity rules may result in serious consequences." },
        { id: 5, text: "The writing center can teach you techniques to paraphrase sources correctly." },
        { id: 6, text: "Online tools can help you check whether your citations follow the correct format." },
        { id: 7, text: "Collaboration is allowed only when the professor clearly permits students to work together." },
      ],
    },
    interview: {
      scenario: "You have agreed to take part in a research study about food habits. You will have a short online interview with a researcher.",
      questions: [
        {
          id: 1,
          question: "What kinds of food do you usually eat during a typical day?",
          sampleAnswer: "On a typical day, I try to maintain a balanced diet by focusing on whole, nutritious foods. For breakfast, I usually start with something quick but energizing, like oatmeal topped with fresh berries and a handful of nuts. When lunchtime rolls around, I prefer a lighter meal to avoid that mid-afternoon slump. Therefore, I typically opt for a large salad with grilled chicken or chickpeas, dressed in olive oil. Finally, for dinner, I tend to cook a more substantial meal, such as baked salmon served with roasted sweet potatoes and broccoli. In between meals, if I feel hungry, I generally snack on Greek yogurt or a piece of fruit. Overall, I focus on variety, ensuring I get plenty of protein and vegetables throughout the day.",
        },
        {
          id: 2,
          question: "Some people cook most of their meals at home, while others prefer eating at restaurants. What do you usually do? Why?",
          sampleAnswer: "I definitely fall into the category of people who prefer cooking most of their meals at home. For me, the primary reason is health and control; when I prepare my own food, I know exactly what ingredients are going into it, allowing me to limit unhealthy fats and excess salt. Additionally, cooking at home is incredibly cost-effective. Ordering takeout or dining at restaurants frequently can become quite expensive, so preparing meals myself helps me stick to a budget. That being said, I do enjoy eating out occasionally, especially on weekends. It serves as a nice treat and a great way to socialize with friends without the hassle of washing dishes. However, on a regular basis, home-cooked meals are my go-to choice.",
        },
        {
          id: 3,
          question: "How important is healthy food in your daily life?",
          sampleAnswer: "Healthy eating is incredibly important to me, and I consider it a top priority in my daily life. For one, the food I eat directly impacts my energy levels and focus. I notice a significant difference in how I feel; when I eat nutrient-dense foods, I have sustained energy throughout the day, whereas processed foods leave me feeling sluggish. Furthermore, I view healthy eating as a long-term investment in my well-being. Practicing good habits now is essential for preventing future health issues. That is not to say I am overly strict. I believe in balance, so I allow myself occasional treats. However, centering my daily diet around wholesome foods is vital for keeping me feeling my best both physically and mentally.",
        },
        {
          id: 4,
          question: "Some experts believe schools should teach students more about nutrition and healthy eating. Do you agree or disagree? Why?",
          sampleAnswer: "I strongly agree that schools should teach students about nutrition and healthy eating. In my opinion, learning how to fuel your body is a fundamental life skill, just like financial literacy or basic math. First of all, establishing healthy habits at a young age is crucial. Children who learn the value of a balanced diet early on are much more likely to carry those nutritious choices into adulthood, which helps prevent long-term health issues like obesity or diabetes. Furthermore, we live in a world filled with processed foods and confusing marketing. School lessons can provide students with the critical thinking skills they need to understand food labels and make informed decisions. Ultimately, incorporating nutrition into the curriculum empowers the next generation to take control of their own health.",
        },
      ],
    },
    writing: {
      buildSentence: [
        { id: 1, prompt: "My internet connection has been unstable all week.", scrambled: "reported / the issue / has / your provider / to / been", answer: "Has the issue been reported to your provider?" },
        { id: 2, prompt: "I'm thinking about volunteering on weekends.", scrambled: "kind/what/work/enjoy doing/ you / of / would", answer: "What kind of work would you enjoy doing?" },
        { id: 3, prompt: "I accidentally deleted an important file.", scrambled: "recycle / still be / stored / bin / in the / might / the document", answer: "The document might still be stored in the recycle bin." },
        { id: 4, prompt: "I'm planning a trip to Japan next year.", scrambled: "visit/ have / want to / which cities / you / you decided", answer: "Have you decided which cities you want to visit?" },
        { id: 5, prompt: "I heard that Emma quit her job.", scrambled: "why/know/leave/to/decided / do/ she / you", answer: "Do you know why she decided to leave?" },
        { id: 6, prompt: "The meeting was canceled this morning.", scrambled: "that/who/know/decision/do/made/you", answer: "Do you know who made that decision?" },
        { id: 7, prompt: "I'm trying to choose a topic for my research paper.", scrambled: "writing/interested/subjects/are/about/what/in/you", answer: "What subjects are you interested in writing about?" },
        { id: 8, prompt: "My package still hasn't arrived.", scrambled: "company/contacted/shipped/have/the/that/you/it", answer: "Have you contacted the company that shipped it?" },
        { id: 9, prompt: "I'm thinking about taking a gap year after university.", scrambled: "to gain / opportunity / sounds like / some / a good / that / life experience", answer: "That sounds like a good opportunity to gain some life experience." },
        { id: 10, prompt: "I'm considering applying for a scholarship.", scrambled: "accepted / usually increases / your chances / of being/applying early", answer: "Applying early usually increases your chances of being accepted." },
      ],
      writeEmail: {
        situation: "Your friend Sophie recently adopted a cat from a local animal shelter. You have not spoken to her for several weeks, and you are curious about the cat's personality and whether having a pet has changed her daily routine.",
        task: ["Ask about the cat's personality and behavior.", "Ask how your friend is adjusting to pet ownership.", "Suggest meeting soon so you can see the cat."],
        to: "sophie.miller89@gmail.com",
        subject: "Your New Cat",
        sampleAnswer: "Hi Sophie,\n\nI hope you are doing well! It has been a few weeks since we last caught up, and I was just thinking about your new cat from the shelter.\n\nI would love to know how everything is going. What is the cat's personality like? Is it super playful and energetic, or more relaxed and shy? Also, how are you adjusting to having a pet around? Has pet ownership changed your daily routine much?\n\nLet's get together sometime this weekend so I can finally meet your new companion. Let me know what day works best for you!\n\nBest,\nGina",
      },
      academicDiscussion: {
        professorPrompt: "In many countries, people are using digital payment methods more frequently than cash. Supporters of a cashless society argue that electronic payments are faster, safer, and more convenient. However, others believe cash should remain important because not everyone has equal access to technology, and digital systems can fail. Should societies move toward becoming mostly cashless?",
        student1: { name: "Andrea", post: "I support digital payments because they make everyday transactions much more convenient. People no longer need to carry large amounts of money, and payments can be completed almost instantly. Digital systems also make it easier to track spending and reduce certain types of crime." },
        student2: { name: "Joshua", post: "I think cash should continue to play an important role. Some people, especially older adults, may struggle with digital technology. In addition, technical problems or power outages could prevent people from accessing their money when they need it." },
        sampleAnswer: "I agree with Andrea's view that societies should transition toward becoming mostly cashless. One important reason is that electronic transactions streamline daily financial activities, which can save individuals and businesses significant time. Moreover, digital payment apps automatically record every purchase, making budgeting and tracking expenses effortless for everyday consumers.\n\nWhile Joshua suggests that physical currency remains necessary for tech-averse individuals and during unexpected system outages, this perspective may be less convincing because modern digital payment infrastructure is becoming exceptionally reliable and user-friendly. For example, simple tap-to-pay cards and smartphone apps now allow elderly users to complete transactions in seconds without navigating complex menus.\n\nUltimately, although maintaining emergency cash backups offers temporary convenience during technical glitches, adopting a cashless system provides far greater efficiency and long-term security.",
      },
    },
  },
  {
    testNumber: 11,
    title: "Computer Center & Free Time Activities",
    listenRepeat: {
      scenario: "You are learning how to guide new students through the computer center. Listen to the speaker and repeat what she says. Repeat only once.",
      sentences: [
        { id: 1, text: "Welcome to the computer center." },
        { id: 2, text: "Workstations are available during operating hours." },
        { id: 3, text: "Printing and scanning services are located near the back wall." },
        { id: 4, text: "Technical support staff can assist students with hardware or software issues." },
        { id: 5, text: "Headphones must be used to avoid disturbing others nearby." },
        { id: 6, text: "Important files should be saved to personal storage devices before logging out." },
        { id: 7, text: "Please remember to log out completely before leaving your workstation." },
      ],
    },
    interview: {
      scenario: "You have agreed to take part in a research study about free time activities. You will have a short online interview with a researcher.",
      questions: [
        {
          id: 1,
          question: "What activities do you usually do in your free time?",
          sampleAnswer: "In my free time, I usually engage in a mix of active and relaxing hobbies. On weeknights, I love cooking new recipes or reading historical fiction novels, which helps me unwind after a busy day. However, on the weekends, I prefer getting outdoors. I regularly go hiking at a nearby nature reserve or meet up with friends for a casual game of basketball. I find that alternating between these quiet, independent activities and more energetic, social settings keeps my routine balanced. Overall, these hobbies not only give me a break from my academic responsibilities but also allow me to explore new interests and stay physically active.",
        },
        {
          id: 2,
          question: "Which activities help you relax the most? Why?",
          sampleAnswer: "Out of all my free time activities, going for a long run outside helps me relax the most. When I am jogging, the rhythmic movement and physical exertion force me to focus entirely on my breathing rather than my daily stresses. It acts as a form of moving meditation, completely clearing my mind. Furthermore, being out in nature and getting fresh air provides an immediate psychological lift that indoor activities simply cannot replicate. By the time I finish a session, my body is physically tired, but my mind feels completely refreshed and recharged. Ultimately, running is my ultimate stress reliever because it perfectly combines physical fitness with mental clarity.",
        },
        {
          id: 3,
          question: "Some people prefer spending their free time alone, while others prefer social activities with friends. What do you prefer? Why?",
          sampleAnswer: "While I enjoy occasional moments of solitude, I generally prefer spending my free time engaging in social activities with friends. After a demanding week of studying, interacting with the people closest to me serves as a powerful way to recharge my energy. Getting together for coffee or playing a team sport allows me to step away from my own thoughts, share some laughs, and gain fresh perspectives on life. Furthermore, human beings are naturally social creatures, and I find that shared experiences create lasting memories that independent hobbies simply cannot provide. Ultimately, balancing my routine with meaningful social interactions keeps me motivated and prevents the feelings of isolation that sometimes come with heavy academic workloads.",
        },
        {
          id: 4,
          question: "Some experts believe people should spend more time on hobbies instead of passive activities like watching television. Do you agree or disagree? Why?",
          sampleAnswer: "I strongly agree with the experts who believe people should prioritize active hobbies over passive entertainment like watching television. Engaging in a hobby, whether it is learning an instrument, painting, or gardening, demands mental focus and active problem-solving. This cognitive stimulation keeps our brains sharp and provides a tangible sense of accomplishment when we improve. In contrast, passive activities like binge-watching TV require almost no mental effort, which often leaves people feeling bored or drained rather than genuinely refreshed. While casual viewing is fine in moderation, spending free time on a dedicated hobby is far more rewarding because it fosters personal growth and creates a much more fulfilling sense of relaxation.",
        },
      ],
    },
  },
  // Writing data is only for tests 1–10; test 11 is speaking-only
];
