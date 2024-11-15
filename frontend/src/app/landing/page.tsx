'use client';  // Add this if the component uses hooks or browser APIs
import { useRouter } from 'next/navigation';  // Replace useNavigate
import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BookOpen, ChevronDown, ChevronUp, Scale, Star, Award, ChevronLeft, ChevronRight, PencilIcon, PlusCircle, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"




const pastelColors = [
  "#16697A", "#489FB5", "#82C0CC", "#B7B7A4", "#f5dfbb", "#FFA62B"
];

export default function LandingPage() {
const router = useRouter();  // Replace useNavigate
  const [isOpen, setIsOpen] = useState(false)
  const [citation, setCitation] = useState({
    caseName: "Donoghue v Stevenson",
    year: "1932",
    volume: "",
    lawReportSeries: "AC",
    startingPage: "562",
    pinpoint: "",
    shortTitle: "",
  })

  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "Citely genuinely pays for itself 10x with the amount of time it saves me on assignments. I can't see myself going back.",
      author: "Matthew H. (Law Student)"
    },
    {
      text: "The AGLC4 citation generation is worth its weight in gold. The tagging system has also saved me countless hours of reorganizing references.",
      author: "David K. (Legal Academic)"
    },
    {
      text: "Citely has streamlined my drafting process. Incredibly cheap for what it offers. Highly recommended for any legal professional.",
      author: "Michael S. (Corporate Lawyer)"
    },
    {
      text: "I've tried every citation tool out there. Citely's attention to legal-specific needs puts it leagues ahead of generic citation managers.",
      author: "Patricia L. (Law Librararian)"
    },
    {
      text: "The automatic formatting is flawless. I no longer spend hours double-checking citation formats before submissions - it's already good to go.",
      author: "Thomas W. (PhD Candidate)"
    },
    {
      text: "I always leave citations to the last minute. Citely helps me stay organised - I love not having to worry about that part of assessments anymore!",
      author: "Sarah M. (Law Student)"
    },
    {
      text: "There are a few tools for managing citations, but none designed specifically for AGLC4. Citely is just objectively better for us.",
      author: "Alex R. (Postgraduate Researcher)"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const newIndex = direction === 'left' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(testimonials.length - 3, currentIndex + 1);
      setCurrentIndex(newIndex);
      carouselRef.current.scrollTo({ left: newIndex * carouselRef.current.offsetWidth / 3, behavior: 'smooth' });
    }
  };

  const formatCitation = () => {
    const parts = [];

    if (citation.caseName) {
      parts.push(`<i>${citation.caseName}</i>`);
    }
    if (citation.year) {
      parts.push(`(${citation.year})`);
    }
    if (citation.volume) {
      parts.push(citation.volume);
    }
    if (citation.lawReportSeries) {
      parts.push(citation.lawReportSeries);
    }
    if (citation.startingPage) {
      parts.push(citation.startingPage + (citation.pinpoint ? ',' : ''));
    }
    if (citation.pinpoint) {
      parts.push(citation.pinpoint);
    }
    if (citation.shortTitle) {
      parts.push(`(<i>'${citation.shortTitle}'</i>)`);
    }

    return parts.join(' ');
  }

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(prev => !prev)
  }, [])

  const reviewsRef = useRef<HTMLDivElement>(null);

  const scrollToReviews = useCallback(() => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const [tags, setTags] = useState<{ id: string; name: string; color: string }[]>([
    { id: '1', name: 'Negligence', color: '#489FB5' },
    { id: '2', name: 'Tort Law', color: '#FFA62B' }
  ]);
  const [newTag, setNewTag] = useState('');
  const [editingTagId, setEditingTagId] = useState<string | null>(null);

  const handleAddTag = () => {
    if (newTag.trim()) {
      const newTagObject = {
        id: String(tags.length + 1),
        name: newTag.trim(),
        color: getRandomPastelColor()
      };
      setTags([...tags, newTagObject]);
      setNewTag('');
    }
  };

  const getRandomPastelColor = () => {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  };

  const handleTagColorChange = (tagId: string, newColor: string) => {
    setTags(tags.map(tag => 
      tag.id === tagId ? { ...tag, color: newColor } : tag
    ));
    setEditingTagId(null);
  };

  const handleTagDelete = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
    setEditingTagId(null);
  };

  return (
    <div className="bg-white">
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        <div className="transform -translate-y-[15%] w-full">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-start">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                  Law,<br></br> Simplified.
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  The only citation and source management tool built specifically for Australian lawyers, students and researchers using AGLC4.
                </p>
                <div className="flex items-center space-x-2 text-primary">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <span className="font-semibold">2024 Australian LegalTech Innovation Award Winner</span>
                </div>
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-3 bg-transparent text-black border-2 border-black rounded-md hover:bg-black hover:text-white transition-colors duration-300"
                >
                  Get Started
                </Button>
              </div>
              <div className="relative">
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="w-full"
                >
                  <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-primary">
                        <PencilIcon className="h-5 w-5" />
                        <span className="font-semibold">Edit Source</span>
                      </div>
                      <div className="space-y-2">
                        <div 
                          className="p-2 border rounded-md bg-white"
                          dangerouslySetInnerHTML={{ __html: formatCitation() }}
                        />
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Type:</span>
                          <span className="text-sm font-medium">Reported Case</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Tags:</span>
                          <div className="flex flex-wrap gap-1 items-center">
                            {tags.map((tag) => (
                              <div key={tag.id} className="relative inline-block">
                                <Badge
                                  variant="outline"
                                  className="cursor-pointer"
                                  style={{ backgroundColor: tag.color }}
                                  onClick={() => setEditingTagId(tag.id)}
                                >
                                  {tag.name}
                                </Badge>
                                {editingTagId === tag.id && (
                                  <div className="absolute z-10 mt-2 w-48 p-2 bg-white rounded-md shadow-lg">
                                    <div className="flex flex-wrap gap-1 mb-2">
                                      {pastelColors.map((pastelColor) => (
                                        <button
                                          key={pastelColor}
                                          className="w-6 h-6 rounded-full"
                                          style={{ backgroundColor: pastelColor }}
                                          onClick={() => handleTagColorChange(tag.id, pastelColor)}
                                        />
                                      ))}
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => handleTagDelete(tag.id)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                      <Button onClick={() => setEditingTagId(null)} size="sm">Close</Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                            <div className="relative mt-1">
                              <Input
                                type="text"
                                placeholder="Add tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleAddTag();
                                  }
                                }}
                                className="w-24 h-7 text-xs pr-6 pl-2 py-1 rounded-full"
                              />
                              <PlusCircle 
                                className="w-4 h-4 absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" 
                                onClick={handleAddTag}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto", marginTop: 16 },
                            collapsed: { opacity: 0, height: 0, marginTop: 0 }
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <CollapsibleContent className="space-y-4 pt-2 pr-2 pb-4">
                            {Object.entries(citation).map(([key, value], index) => (
                              <motion.div
                                key={key}
                                variants={{
                                  open: { opacity: 1, y: 0 },
                                  collapsed: { opacity: 0, y: 20 }
                                }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="grid grid-cols-4 items-center gap-4"
                              >
                                <Label htmlFor={key} className="text-right">
                                  {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                                </Label>
                                <Input
                                  id={key}
                                  value={value}
                                  onChange={(e) =>
                                    setCitation((prev) => ({ ...prev, [key]: e.target.value }))
                                  }
                                  className="col-span-3"
                                />
                              </motion.div>
                            ))}
                          </CollapsibleContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="mt-3 flex justify-center">
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 hover:bg-transparent focus:ring-0"
                          onClick={handleToggle}
                        >
                          {isOpen ? (
                            <ChevronUp className="h-6 w-6 text-primary" />
                          ) : (
                            <motion.div
                              animate={{ y: [0, 10, 0] }} // Changed from [0, -10, 0] to [0, 10, 0]
                              transition={{ repeat: Infinity, duration: 1 }}
                            >
                              <ChevronDown className="h-6 w-6 text-primary" />
                            </motion.div>
                          )}
                          <span className="sr-only">Toggle citation details</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </Card>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Button
            variant="ghost"
            size="lg"
            className="p-2 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-full border border-gray-300"
            onClick={scrollToReviews}
          >
            <ChevronDown className="h-10 w-10 text-primary" />
            <span className="sr-only">Scroll to reviews</span>
          </Button>
        </div>

      <div ref={reviewsRef} className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-2">
            From law students to senior partners
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12">
            Find out why 97.4% of users give us five stars 
          </p>
          <div className="relative">
            <div 
              ref={carouselRef}
              className="flex overflow-x-hidden"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="flex-shrink-0 w-1/3 px-2"
                >
                  <Card className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                      <p className="font-semibold">{testimonial.author}</p>
                    </div>
                    <div className="flex items-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <button 
              onClick={() => scroll('left')} 
              className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
              disabled={currentIndex === testimonials.length - 3}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-8">See AGLC4 Cite in Action</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="AGLC4 Cite Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Replace the bottom chevron with the app-view image */}
      <div className="w-full flex justify-center mt-8">
        <img 
          src="/app-view.png" 
          alt="App View" 
          className="w-[70%] rounded-lg border border-black"
        />
      </div>
    </div>
  )
}
