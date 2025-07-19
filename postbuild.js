const { execSync } = require('child_process');

if (process.env.NODE_ENV === 'development') {
    console.log('Running postbuild for development...');
    try {
        execSync('mkdir dist\\logs && xcopy logs dist\\logs /E /I', { stdio: 'inherit' });
    } catch (error) {
        console.error('Failed to copy logs folder:', error);
    }
} else {
    console.log('Skipping postbuild');
}
