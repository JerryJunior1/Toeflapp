// Tatiana's TOEFL Practice Tests — Speaking Data
// 11 full tests with Listen & Repeat and Take an Interview

export interface RepeatSentence {
  id: number;
  text: string;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  sampleAnswer: string;
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
];
