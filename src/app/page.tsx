import BlogForm from '@/components/Create-blog';

const CreateBlog = () => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Create a New Blog Post</h1>
      <BlogForm />
    </div>
  );
};

export default CreateBlog;
