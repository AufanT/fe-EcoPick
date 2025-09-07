import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const About = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/team-1.jpg',
      bio: 'Environmental activist with 10+ years experience in sustainable business.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Product',
      image: '/team-2.jpg',
      bio: 'Product designer passionate about creating eco-friendly solutions.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Sustainability Director',
      image: '/team-3.jpg',
      bio: 'Expert in environmental science and sustainable supply chains.'
    },
    {
      name: 'David Kim',
      role: 'Operations Manager',
      image: '/team-4.jpg',
      bio: 'Ensures our operations align with our environmental values.'
    }
  ];

  const values = [
    {
      icon: '🌱',
      title: 'Sustainability First',
      description: 'Every decision we make prioritizes environmental impact and long-term sustainability.'
    },
    {
      icon: '🤝',
      title: 'Community Focused',
      description: 'We believe in supporting local communities and fair trade practices.'
    },
    {
      icon: '🔬',
      title: 'Innovation Driven',
      description: 'Constantly researching and developing new eco-friendly solutions.'
    },
    {
      icon: '💚',
      title: 'Transparency',
      description: 'Open about our processes, suppliers, and environmental impact.'
    }
  ];

  const milestones = [
    { year: '2020', title: 'EcoPick Founded', description: 'Started with a vision to make eco-friendly products accessible to everyone.' },
    { year: '2021', title: 'First 1000 Customers', description: 'Reached our first milestone of 1000 customers committed to sustainable living.' },
    { year: '2022', title: 'Carbon Neutral Operations', description: 'Achieved carbon neutrality across all our operations and supply chain.' },
    { year: '2023', title: '1 Million Trees Planted', description: 'Partnered with reforestation projects to plant 1 million trees worldwide.' },
    { year: '2024', title: 'Global Expansion', description: 'Expanded to serve customers in 15 countries across 3 continents.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                About <span className="text-green-600">EcoPick</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're on a mission to make sustainable living accessible, affordable, and effortless for everyone. 
                Join us in creating a greener future, one product at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    EcoPick was born from a simple observation: sustainable products were either too expensive, 
                    hard to find, or didn't meet quality expectations. We believed that caring for the planet 
                    shouldn't be a luxury or a compromise.
                  </p>
                  <p>
                    Founded in 2020 by a team of environmental enthusiasts and business innovators, 
                    EcoPick started as a small online store with a curated selection of eco-friendly products. 
                    Today, we've grown into a trusted platform serving thousands of customers worldwide.
                  </p>
                  <p>
                    Our journey has been guided by one core principle: making sustainable choices easy, 
                    accessible, and rewarding for everyone. We carefully vet every product, partner with 
                    ethical suppliers, and continuously work to reduce our environmental footprint.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/about-story.jpg"
                  alt="EcoPick team working"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl">🌍</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do, from product selection to customer service.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Together with our customers, we're making a real difference for the planet.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">1.2M+</div>
                <div className="text-gray-600">Plastic Items Prevented</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">850K+</div>
                <div className="text-gray-600">Trees Planted</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">2.5M+</div>
                <div className="text-gray-600">CO2 Tons Offset</div>
              </div>
            </div>

            <div className="bg-green-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Every purchase you make contributes to our environmental impact. 
                Together, we can create a more sustainable future.
              </p>
              <button className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind EcoPick's mission to make sustainability accessible.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Key milestones in our mission to make sustainability accessible to everyone.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-green-600 font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center relative z-10">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of customers who are already making sustainable choices with EcoPick.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Shop Products
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;

