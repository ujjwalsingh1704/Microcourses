import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { 
  Award, 
  IndianRupee, 
  Calendar, 
  Users, 
  FileText, 
  Target,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CreateScholarship = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    amount: '',
    numberOfAwards: '',
    deadline: '',
    eligibilityCriteria: '',
    requirements: '',
    submissionGuidelines: '',
    evaluationCriteria: '',
    tags: '',
    difficulty: 'Beginner'
  });

  const categories = [
    'Programming',
    'Data Science',
    'Web Development',
    'Mobile Development',
    'AI/Machine Learning',
    'Cybersecurity',
    'Digital Marketing',
    'Graphic Design',
    'Social Impact',
    'Community Service',
    'Research',
    'Innovation',
    'Entrepreneurship',
    'Other'
  ];

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateStep1 = () => {
    return formData.title && formData.description && formData.category && formData.amount && formData.numberOfAwards && formData.deadline;
  };

  const validateStep2 = () => {
    return formData.eligibilityCriteria && formData.requirements && formData.submissionGuidelines;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success and redirect
    alert('Scholarship created successfully! Students can now apply.');
    navigate('/sponsor/scholarships');
  };

  const totalAmount = parseInt(formData.amount || '0') * parseInt(formData.numberOfAwards || '0');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Scholarship</h1>
          <p className="text-gray-600">Help students achieve their learning goals with milestone-based rewards</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className={`h-1 w-16 ${currentStep >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2 px-4">
            <span>Basic Details</span>
            <span>Requirements</span>
            <span>Review & Publish</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Award className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Basic Scholarship Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Scholarship Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Complete Python Programming Course"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Describe what students need to accomplish to earn this scholarship..."
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                      Amount per Student (₹) *
                    </label>
                    <div className="relative">
                      <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        required
                        min="500"
                        max="5000"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="1000"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Recommended range: ₹500 - ₹5000</p>
                  </div>

                  <div>
                    <label htmlFor="numberOfAwards" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Awards *
                    </label>
                    <input
                      type="number"
                      id="numberOfAwards"
                      name="numberOfAwards"
                      required
                      min="1"
                      max="100"
                      value={formData.numberOfAwards}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                      Application Deadline *
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      required
                      value={formData.deadline}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Python, Programming, Beginner"
                    />
                  </div>
                </div>

                {/* Total Cost Preview */}
                {formData.amount && formData.numberOfAwards && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-900">Total Scholarship Budget:</span>
                      <span className="text-lg font-bold text-purple-600 flex items-center">
                        <IndianRupee className="w-4 h-4 mr-1" />
                        {totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-purple-700 mt-1">
                      {formData.numberOfAwards} awards × ₹{parseInt(formData.amount || '0').toLocaleString()} each
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!validateStep1()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Continue to Requirements
                </button>
              </div>
            )}

            {/* Step 2: Requirements */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Target className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Requirements & Guidelines</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="eligibilityCriteria" className="block text-sm font-medium text-gray-700 mb-2">
                      Eligibility Criteria *
                    </label>
                    <textarea
                      id="eligibilityCriteria"
                      name="eligibilityCriteria"
                      rows={4}
                      required
                      value={formData.eligibilityCriteria}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Who can apply? (e.g., Students enrolled in computer science, minimum GPA requirements, etc.)"
                    />
                  </div>

                  <div>
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                      What Students Must Complete *
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={5}
                      required
                      value={formData.requirements}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="List specific requirements (e.g., Complete 40 hours of coursework, Submit final project, Provide certificates, etc.)"
                    />
                  </div>

                  <div>
                    <label htmlFor="submissionGuidelines" className="block text-sm font-medium text-gray-700 mb-2">
                      Submission Guidelines *
                    </label>
                    <textarea
                      id="submissionGuidelines"
                      name="submissionGuidelines"
                      rows={4}
                      required
                      value={formData.submissionGuidelines}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="How should students submit their work? (e.g., PDF format, GitHub repository, essay requirements, etc.)"
                    />
                  </div>

                  <div>
                    <label htmlFor="evaluationCriteria" className="block text-sm font-medium text-gray-700 mb-2">
                      Evaluation Criteria (Optional)
                    </label>
                    <textarea
                      id="evaluationCriteria"
                      name="evaluationCriteria"
                      rows={3}
                      value={formData.evaluationCriteria}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="How will applications be evaluated? (e.g., Code quality, project complexity, learning demonstration, etc.)"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!validateStep2()}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Review & Publish
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Publish */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Review & Publish</h2>
                  <p className="text-gray-600">Please review your scholarship details before publishing</p>
                </div>

                {/* Scholarship Preview */}
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{formData.title}</h3>
                      <p className="text-gray-600 mt-1">{formData.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600 flex items-center">
                        <IndianRupee className="w-4 h-4 mr-1" />
                        {parseInt(formData.amount || '0').toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-500">{formData.numberOfAwards} awards available</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Category:</span>
                      <p className="text-gray-600">{formData.category}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Difficulty:</span>
                      <p className="text-gray-600">{formData.difficulty}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Deadline:</span>
                      <p className="text-gray-600">{new Date(formData.deadline).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Total Budget:</span>
                      <p className="text-green-600 font-medium">₹{totalAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {formData.tags && (
                    <div>
                      <span className="font-medium text-gray-700 text-sm">Tags:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.tags.split(',').map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Important Notes */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Before Publishing:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Ensure you have sufficient funds (₹{totalAmount.toLocaleString()}) to cover all awards</li>
                        <li>• Review all requirements and guidelines for clarity</li>
                        <li>• Once published, students can immediately start applying</li>
                        <li>• You'll receive notifications for new applications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back to Edit
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish Scholarship'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateScholarship;